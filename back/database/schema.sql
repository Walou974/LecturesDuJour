CREATE TABLE IF NOT EXISTS TextType (
    TextTypeId integer PRIMARY KEY,
    Label VARCHAR(24),
    DisplayedLabel Varchar(24)
);

CREATE TABLE IF NOT EXISTS GospelTexts (
    TextTypeId integer CONSTRAINT GospelTexts_TextType_TextTypeId_fk REFERENCES TextType,
    TextContent NVARCHAR (2048),
    TextDate DATE,
    TextRef NVARCHAR (256),
    TextTitle NVARCHAR (256),
    Intro VARCHAR(32),
    CONSTRAINT GospelTexts_pk PRIMARY KEY (TextTypeId, TextDate)
);

CREATE VIEW IF NOT EXISTS Texts AS
SELECT
    TextTitle AS 'title',
    TextContent AS 'text',
    TextRef AS 'ref',
    Intro AS 'intro',
    DisplayedLabel,
    Label AS 'Type',
    TextDate
FROM
    GospelTexts
    JOIN main.TextType TT ON TT.TextTypeId = GospelTexts.TextTypeId
ORDER BY
    TextDate DESC;

insert into TextType (TextTypeId, Label, DisplayedLabel)
values  (1, 'evangile', 'Evangile'),
        (2, 'psaume', 'Psaume'),
        (3, 'lecture_1', 'Lecture'),
        (4, 'verse', 'Verset');
