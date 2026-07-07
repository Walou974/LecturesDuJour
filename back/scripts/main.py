import datetime
import requests
from tqdm import tqdm
import DBHelper

db_helper = DBHelper.DBHelper("back\\database\\data.db")

def get_messes(Date):
    url = f"https://api.aelf.org/v1/messes/{Date}/france"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        return data
    else:
        #print(f"Failed to retrieve data. Status code: {response.status_code}")
        return None

def get_evangile(data):
    messes = data.get("messes")
    lectures = messes[0].get("lectures")

    if lectures:
        for lecture in lectures:
            if lecture.get("type") == "evangile":
                evangile_title = lecture.get("titre", "")
                evangile_text = lecture.get("contenu", "")
                evangile_ref = lecture.get("ref", "")
                intro = lecture.get("intro_lue", "")
                verse = lecture.get("verset_evangile", "")
                verse_ref = lecture.get("ref_verset", "")

                return {
                    "type": "evangile",
                    "title": evangile_title,
                    "text": evangile_text,
                    "ref": evangile_ref,
                    "intro": intro,
                    "verse": verse,
                    "verse_ref": verse_ref
                }
    #else:
        #print("Evangile not found in the data.")
        
def get_psaume(data):
    messes = data.get("messes")
    lectures = messes[0].get("lectures")

    if lectures:
        for lecture in lectures:
            if lecture.get("type") == "psaume":
                psaume_title = lecture.get("titre", "")
                psaume_text = lecture.get("contenu", "")
                psaume_ref = lecture.get("ref", "")

                return {
                    "type": "psaume",
                    "title": psaume_title,
                    "text": psaume_text,
                    "ref": psaume_ref
                }
    #else:
        #print("Psaume not found in the data.")


def get_lecture_1(data):
    messes = data.get("messes")
    lectures = messes[0].get("lectures")

    if lectures:
        for lecture in lectures:
            if lecture.get("type") == "lecture_1":
                lecture_1_title = lecture.get("titre", "")
                lecture_1_text = lecture.get("contenu", "")
                lecture_1_ref = lecture.get("ref", "")
                intro = lecture.get("intro_lue", "")

                return {
                    "type": "lecture_1",
                    "title": lecture_1_title,
                    "text": lecture_1_text,
                    "ref": lecture_1_ref,
                    "intro": intro
                }
    #else:
        #print("lecture_1 not found in the data.")
if __name__ == "__main__":
    numdays = 240
    base = datetime.date.today()
    date_list = [base - datetime.timedelta(days=x) for x in range(numdays)]
    for date in tqdm(date_list):
        data = get_messes(date)
        if data:
            text_types = db_helper.get_text_types() # dictionary of text types from the database as {label: id}
            evangile = get_evangile(data)
            psaume = get_psaume(data)
            lecture_1 = get_lecture_1(data)
            if evangile:
                try:
                    # Insert into database main text
                    db_helper.insert_text_type(
                        type_name=text_types.get(evangile["type"], None),
                        text_content=evangile["text"],
                        text_date=str(date),
                        text_ref=evangile["ref"],
                        text_title=evangile["title"],
                        intro=evangile["intro"]
                    )
                    
                    # Insert into database verse
                    db_helper.insert_text_type(
                        type_name=text_types.get("verse", None),
                        text_content=evangile["verse"],
                        text_date=str(date),
                        text_ref=evangile["verse_ref"],
                        text_title=evangile["title"],
                        intro=""
                    )
                except Exception as e:
                    print(f"An error occurred while inserting data into the database: {e}")
            #else:
                #print("No evangile available to process.")
            if psaume:
                try:
                    
                    # Insert into database main text
                    db_helper.insert_text_type(
                        type_name=text_types.get(psaume["type"], None),
                        text_content=psaume["text"],
                        text_date=str(date),
                        text_ref=psaume["ref"],
                        text_title=psaume["title"],
                        intro=None
                    )
                except Exception as e:
                    print(f"An error occurred while inserting data into the database: {e}")
            #else:
                #print("No psaume available to process.")
            
            if lecture_1:
                try:
                    
                    # Insert into database main text
                    db_helper.insert_text_type(
                        type_name=text_types.get(lecture_1["type"], None),
                        text_content=lecture_1["text"],
                        text_date=str(date),
                        text_ref=lecture_1["ref"],
                        text_title=lecture_1["title"],
                        intro=None
                    )
                except Exception as e:
                    print(f"An error occurred while inserting data into the database: {e}")
            #else:
                #print("No lecture_1 available to process.")