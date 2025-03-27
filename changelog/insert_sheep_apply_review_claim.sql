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
        '9b521f6a-c4dc-4b87-b3d0-1c8819725c3d',
        'IAHW-KH1H-WNA4',
        '{"type": "EE", "reference": "TEMP-KH1H-WNA4", "declaration": true, "offerStatus": "accepted", "organisation": {"crn": "1100499369", "sbi": "106208072", "name": "madeUpCo", "email": "farmer@farm.com", "address": "Somewhere", "orgEmail": "org@company.com", "userType": "newUser", "farmerName": "John Smith"}, "confirmCheckDetails": "yes"}',
        '2024-12-31 18:44:49.782000 +00:00',
        '2024-12-31 18:44:49.790000 +00:00',
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
        'ca377281-f96a-4a2d-8635-f6633d99701d',
        'RESH-KH1H-WNA4',
        'IAHW-KH1H-WNA4',
        '{"amount": 436, "vetsName": "Dr Test", "claimType": "R", "dateOfVisit": "2025-01-02T00:00:00.000Z", "dateOfTesting": "2025-01-02T00:00:00.000Z", "laboratoryURN": "123456", "vetRCVSNumber": "7654321", "speciesNumbers": "yes", "typeOfLivestock": "sheep", "numberAnimalsTested": "10"}',
        8,
        '2025-01-02 08:50:25.122000 +00:00',
        '2025-01-02 08:50:25.147000 +00:00',
        'admin',
        null,
        'R'
    );
