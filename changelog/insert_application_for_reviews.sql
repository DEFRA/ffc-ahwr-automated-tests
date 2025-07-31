-- Script to insert an application for creating review claims before the multiple herd release date
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
        'e1e99cc0-3c01-4299-93ce-e4f418242d4d',
        'IAHW-AC1H-BBA4',
        '{"type": "EE", "reference": "TEMP-AC1H-BBA4", "declaration": true, "offerStatus": "accepted", "organisation": {"crn": "1100686584", "sbi": "106817866", "name": "madeUpCo", "email": "farmer@farm.com", "address": "Somewhere", "orgEmail": "org@company.com", "userType": "newUser", "farmerName": "John Smith"}, "confirmCheckDetails": "yes"}',
        '2025-04-29 18:44:49.782000 +00:00',
        '2025-04-29 18:44:49.790000 +00:00',
        'admin',
        false,
        1,
        'EE'
    );
