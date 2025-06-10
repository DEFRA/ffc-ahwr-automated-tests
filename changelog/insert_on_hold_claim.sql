-- Inserting an application, and on hold claim for back office testing

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
        'b2a9ae42-6e8b-4298-99a9-3e30a8b0c612',
        'IAHW-SCV6-E55L',
        '{"type": "EE", "reference": "REPI-UG9L-I1XP", "declaration": true, "offerStatus": "accepted", "organisation": {"crn": "1101690658", "sbi": "104215119", "name": "Mr A Test Farmer", "email": "rossjohnsonf@nosnhojssorx.com.test", "address": "35 Battle Gates,TAVISTOCK,HU17 0BH,United Kingdom", "orgEmail": "mrafooksh@skoofarmp.com.test", "userType": "newUser", "farmerName": "Ross John Johnson"}, "confirmCheckDetails": "yes"}',
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
        '837a6307-1ac7-43ab-a841-1557cbe08fe0',
        'REPI-UG9L-I1XP',
        'IAHW-SCV6-E55L',
        '{"amount": 522, "vetsName": "Tom", "claimType": "R", "dateOfVisit": "2025-03-26T00:00:00.000Z", "testResults": "positive", "dateOfTesting": "2025-03-26T00:00:00.000Z", "laboratoryURN": "w5436346ret", "vetRCVSNumber": "5312363", "speciesNumbers": "yes", "typeOfLivestock": "beef", "numberAnimalsTested": "10"}',
        11,
        '2025-03-27 06:14:08.122000 +00:00',
        '2025-03-27 06:14:08.147000 +00:00',
        'admin',
        null,
        'R'
    );
