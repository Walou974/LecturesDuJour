CREATE TABLE TextType (
    TextTypeId integer PRIMARY KEY,
    Label VARCHAR(24),
    DisplayedLabel Varchar(24)
);

CREATE TABLE GospelTexts (
    TextTypeId integer CONSTRAINT GospelTexts_TextType_TextTypeId_fk REFERENCES TextType,
    TextContent NVARCHAR (2048),
    TextDate DATE,
    TextRef NVARCHAR (256),
    TextTitle NVARCHAR (256),
    Intro VARCHAR(32),
    CONSTRAINT GospelTexts_pk PRIMARY KEY (TextTypeId, TextDate)
);

CREATE VIEW Texts AS
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