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
        '7b3f0352-4622-4670-beca-3ac242eef002',
        'IAHW-KH3H-BBA5',
        '{"type": "EE", "reference": "TEMP-KH1H-BBA4", "declaration": true, "offerStatus": "accepted", "organisation": {"crn": "1101032634", "sbi": "106817865", "name": "madeUpCo", "email": "farmer@farm.com", "address": "Somewhere", "orgEmail": "org@company.com", "userType": "newUser", "farmerName": "John Smith"}, "confirmCheckDetails": "yes"}',
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
        '36d1dd82-94a4-4a55-bc26-e28df58dfdff',
        'RESH-KH3H-BBA5',
        'IAHW-KH3H-BBA5',
        '{"amount": 436, "vetsName": "Dr Test", "claimType": "R", "dateOfVisit": "2025-04-30T00:00:00.000Z", "dateOfTesting": "2025-04-30T00:00:00.000Z", "laboratoryURN": "123457-sheep-review", "vetRCVSNumber": "7654321", "speciesNumbers": "yes", "typeOfLivestock": "sheep", "numberAnimalsTested": "10"}',
        8,
        '2025-04-30 08:50:25.122000 +00:00',
        '2025-04-30 08:50:25.147000 +00:00',
        'admin',
        null,
        'R'
    );
