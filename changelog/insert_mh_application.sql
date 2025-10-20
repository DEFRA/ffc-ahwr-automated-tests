-- Script to insert an application for doing multiple herd journeys
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
        '9b324f6a-c4dc-4b87-b3d0-1c8819725c3d',
        'IAHW-KH2H-WNA1',
        '{"type": "EE", "reference": "TEMP-KH2H-WNA1", "declaration": true, "offerStatus": "accepted", "organisation": {"crn": "1100449365", "sbi": "123454321", "name": "madeUpCo", "email": "ted+11@farm.com", "address": "Somewhere", "orgEmail": "org@company.com", "userType": "newUser", "farmerName": "Ted Holmes"}, "confirmCheckDetails": "yes"}',
        '2025-01-01 18:44:49.782000 +00:00',
        '2025-01-01 18:44:49.790000 +00:00',
        'admin',
        false,
        1,
        'EE'
    );
