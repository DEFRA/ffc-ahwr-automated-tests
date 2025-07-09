-- Script to insert an application and a review claim for sheep before the multiple herd release date
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
        'e1e99cc0-3c01-4299-93ce-e4f418242b2c',
        'IAHW-KH1H-BBA4',
        '{"type": "EE", "reference": "TEMP-KH1H-BBA4", "declaration": true, "offerStatus": "accepted", "organisation": {"crn": "1100686584", "sbi": "114262075", "name": "madeUpCo", "email": "farmer@farm.com", "address": "Somewhere", "orgEmail": "org@company.com", "userType": "newUser", "farmerName": "John Smith"}, "confirmCheckDetails": "yes"}',
        '2025-04-29 18:44:49.782000 +00:00',
        '2025-04-29 18:44:49.790000 +00:00',
        'admin',
        false,
        1,
        'EE'
    );

INSERT INTO
    public.claim (
        id,
        reference,
        "applicationReference",
        data,
        "statusId",
        "createdAt",
        "updatedAt",
        "createdBy",
        "updatedBy",
        type
    )
VALUES
    (
        'bfcf717c-e4c2-4d56-91fd-787a6023e523',
        'RESH-KH1H-BBA4',
        'IAHW-KH1H-BBA4',
        '{"amount": 436, "vetsName": "Dr Test", "claimType": "R", "dateOfVisit": "2025-04-30T00:00:00.000Z", "dateOfTesting": "2025-04-30T00:00:00.000Z", "laboratoryURN": "123456-sheep-review", "vetRCVSNumber": "7654321", "speciesNumbers": "yes", "typeOfLivestock": "sheep", "numberAnimalsTested": "10"}',
        8,
        '2025-04-30 08:50:25.122000 +00:00',
        '2025-04-30 08:50:25.147000 +00:00',
        'admin',
        null,
        'R'
    );
