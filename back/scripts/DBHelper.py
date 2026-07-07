import sqlite3

class DBHelper:
    def __init__(self, db_path):
        self.db_path = db_path

    def get_text_types(self):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT TextTypeId, Label FROM TextType;")
        rows = cursor.fetchall()
        conn.close()
        return {row[1]: row[0] for row in rows}  
    
    def insert_text_type(self, type_name, text_content, text_date, text_ref, text_title, intro):
        if (self.check_if_text_exists(text_date, type_name) == False):
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute("insert into GospelTexts (TextTypeId, TextContent, TextDate, TextRef, TextTitle, Intro) values (?, ?, ?, ?, ?, ?)", (type_name, text_content, text_date, text_ref, text_title, intro))
            conn.commit()
            conn.close()
        
        
    def check_if_text_exists(self, text_date, type_name):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM GospelTexts WHERE TextDate = ? and TextTypeId = ? LIMIT 1;", (text_date, type_name))
        result = cursor.fetchone()
        conn.close()
        if (result):
            return True
        return False