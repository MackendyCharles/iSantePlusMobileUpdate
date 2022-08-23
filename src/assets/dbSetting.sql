CREATE TABLE IF NOT EXISTS settingTbl(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    locations TEXT, 
    ipaddress TEXT,
    port TEXT,
    protocol TEXT,
    api TEXT
);
INSERT or IGNORE INTO settingTbl(id, locations, ipaddress, port, protocol, api ) VALUES (1, '8d6c993e-c2cc-11de-8d13-0010c6dffd0f', '200.2.133.226','8081', 'http', 'openmrs/ws/rest/v1');
