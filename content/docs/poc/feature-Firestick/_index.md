---
title: "Firestick POC - Development Research"
date: 2025-10-19T07:41:00+03:00
draft: false
---
# Firestick POC - Development Research

This section documents the Firestick proof of concept including:

- Tooling options (Java/Kotlin, Fire App Builder, etc.)
- Requirements (Fire OS 8, Manifest, testing)
- Team workflow and Appstore publishing process
- Challenges and solutions
- Comparison with standard Android apps

## Implementation Details
- Initial POC implemented with Java in Android Studio
- Kotlin recommended for future scalability
- UI optimized for D-pad and TV layout

## Testing Results
- Code compiles successfully
- Testing pending on physical Firestick (use ADB sideload)
- Emulator validated initial functionality

## Lessons Learned
- Kotlin reduces code (~40%) and enhances null-safety
- Fire OS relies on Amazon services over Google
- Remote navigation critical for Appstore approval

## Next Steps
- Team testing on Firestick device
- Submit signed APK to Appstore
- Plan Kotlin transition for v0.2

## Code Repository
- Prototype: [HoloX-co/SOD-10](https://github.com/HoloX-co/SOD-10)
- Release: [v0.1-poc](https://github.com/HoloX-co/SOD-10/releases/tag/v0.1-poc)

## Additional Files
- [Report](Firestick_Final-Report.md)

Prepared by Kaveh Goodarzi, October 19, 2025