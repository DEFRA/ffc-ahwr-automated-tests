-- Script to insert an application and a review claim for sheep before doing a follow-up claim journey
INSERT INTO
    public.application (
        id,
        reference,
        data,
        "createdAt",
        "updatedAt",
        "createdBy",
        claimed,
        "statusId",
        type
    )
VALUES
    (
        'aa5793f2-4082-499c-82f4-5565dbd670f3',
        'IAHW-KH2H-WNA2',
        '{"type": "EE", "reference": "TEMP-KH2H-WNA2", "declaration": true, "offerStatus": "accepted", "organisation": {"crn": "1103161148", "sbi": "106416234", "name": "madeUpCo", "email": "ted+11@farm.com", "address": "Somewhere", "orgEmail": "org@company.com", "userType": "newUser", "farmerName": "Ted Holmes"}, "confirmCheckDetails": "yes"}',
        '2025-02-01 18:44:49.782000 +00:00',
        '2025-02-01 18:44:49.790000 +00:00',
        'admin',
        false,
        1,
        'EE'
    ),
    (
        '489842a1-7249-4504-a5fb-a26991d57e29',
        'IAHW-KH2H-WNA3',
        '{"type": "EE", "reference": "TEMP-KH2H-WNA3", "declaration": true, "offerStatus": "accepted", "organisation": {"crn": "1103161407", "sbi": "107361798", "name": "madeUpCo", "email": "ted+11@farm.com", "address": "Somewhere", "orgEmail": "org@company.com", "userType": "newUser", "farmerName": "Ted Holmes"}, "confirmCheckDetails": "yes"}',
        '2025-02-01 18:44:49.782000 +00:00',
        '2025-02-01 18:44:49.790000 +00:00',
        'admin',
        false,
        1,
        'EE'
    ),(
        'dfeb7c4e-75b0-4b94-a90e-945355cfd11a',
        'IAHW-KH2H-WNA4',
        '{"type": "EE", "reference": "TEMP-KH2H-WNA4", "declaration": true, "offerStatus": "accepted", "organisation": {"crn": "1103161911", "sbi": "107645299", "name": "madeUpCo", "email": "ted+11@farm.com", "address": "Somewhere", "orgEmail": "org@company.com", "userType": "newUser", "farmerName": "Ted Holmes"}, "confirmCheckDetails": "yes"}',
        '2025-02-01 18:44:49.782000 +00:00',
        '2025-02-01 18:44:49.790000 +00:00',
        'admin',
        false,
        1,
        'EE'
    ),(
        '19d3e386-c355-4aa3-ba1e-bb8fa57b3c4a',
        'IAHW-KH2H-WNA5',
        '{"type": "EE", "reference": "TEMP-KH2H-WNA5", "declaration": true, "offerStatus": "accepted", "organisation": {"crn": "1103161962", "sbi": "106258541", "name": "madeUpCo", "email": "ted+11@farm.com", "address": "Somewhere", "orgEmail": "org@company.com", "userType": "newUser", "farmerName": "Ted Holmes"}, "confirmCheckDetails": "yes"}',
        '2025-02-01 18:44:49.782000 +00:00',
        '2025-02-01 18:44:49.790000 +00:00',
        'admin',
        false,
        1,
        'EE'
    );
