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
        'e036850b-6cc0-4a26-a1bd-8a00fcfa5b5f',
        'IAHW-SQP6-E2XL',
        '{"type": "EE", "reference": "TEMP-SQP6-E2XL", "declaration": true, "offerStatus": "accepted", "organisation": {"crn": "1101690658", "sbi": "107085418", "name": "Mr A Test Farmer", "email": "rossjohnsonf@nosnhojssorx.com.test", "address": "35 Battle Gates,TAVISTOCK,HU17 0BH,United Kingdom", "orgEmail": "mrafooksh@skoofarmp.com.test", "userType": "newUser", "farmerName": "Ross John Johnson"}, "confirmCheckDetails": "yes"}',
        '2025-03-26 06:12:24.782000 +00:00',
        '2025-03-26 06:12:24.790000 +00:00',
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
        'b3d2e907-8847-496b-b0c2-667f47bb0612',
        'REBC-ULQQ-I38P',
        'IAHW-SQP6-E2XL',
        '{"amount": 522, "vetsName": "adeqadasfcsd", "claimType": "R", "dateOfVisit": "2025-03-26T00:00:00.000Z", "testResults": "positive", "dateOfTesting": "2025-03-26T00:00:00.000Z", "laboratoryURN": "w5436346ret", "vetRCVSNumber": "5312363", "speciesNumbers": "yes", "typeOfLivestock": "beef", "numberAnimalsTested": "10"}',
        9,
        '2025-03-26 06:14:08.122000 +00:00',
        '2025-03-26 06:14:08.147000 +00:00',
        'admin',
        null,
        'R'
    );