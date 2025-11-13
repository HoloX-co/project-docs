# Fire TV Stick (Fire OS)

**Date:** November 13, 2025  
**Status:** Ready for planning and implementation

---

## Executive Summary

After extensive research into tooling options, technical requirements, best practices, and publishing workflows, the following conclusions have been reached:

- **Recommended stack:** Native Android development using **Kotlin** (migration from current Java POC planned for v0.2)
- **Tooling:** Android Studio + Kotlin + Media3 ExoPlayer + Leanback + Coil
- **Why not alternatives:** Fire App Builder too restrictive; React Native limited TV support; Web/HTML5 poor performance
- **Current prototype:** Java-based POC successfully built and runs in Android TV emulator
- **Next steps (demo app):** Physical device testing, Kotlin migration, Amazon Appstore submission

---

## 1. Fire OS & Hardware Overview

Fire OS is Amazon's fork of AOSP (Android Open Source Project).

- **Fire OS 8** → Android 10/11 (API 29--30)
- **Fire OS 8.1 (Q1 2025)** → Mandatory TLS 1.3, enhanced Alexa APIs, improved security
- No Google Play Services → Amazon services only (A3L, IAP, ADM)

**2023--2025 Device Matrix**

| Model                  | CPU              | RAM | Storage | Wi-Fi    | Key Features                |
|------------------------|------------------|-----|---------|----------|-----------------------------|
| Fire TV Stick 4K Max   | MT8696T 4×A55 @ 2.0 GHz | 2GB | 16GB    | Wi-Fi 6E | AV1, HDR10+, Dolby Atmos    |
| Fire TV Stick 4K       | MT8696D 4×A55 @ 1.7 GHz | 2GB | 8GB     | Wi-Fi 6 | HDR10+, Dolby Vision        |
| Fire TV Stick 4K Select| MT8698 4×A55 @ 1.7 GHz  | 1GB | 8GB     | Wi-Fi 5 | Low-memory optimization     |

**Critical constraint:** 1 GB RAM on 2025 budget models → aggressive memory optimization required.

---

## 2. Tooling Options -- Detailed Comparison

| Tool         | Language/Framework | Pros                     | Cons                     | Verdict              |
|--------------|-------------------|--------------------------|--------------------------|----------------------|
| **Native Android** | Java / **Kotlin**  | Full API access, best performance, full control | Slightly longer setup      | **Recommended**      |
| **Fire App Builder** | Java             | Fast media-app templates | Very limited customization, media-only | Rejected              |
| **React Native** | JavaScript         | Cross-platform           | Poor Leanback support, bridge overhead | Not suitable         |
| **HTML5 / WebView** | HTML/JS          | No build required        | Poor performance, limited remote control | Not viable           |
| **No-code (Enveu, Uscreen)** | Drag-and-drop        | Zero code                 | No customization, subscription cost | Only for non-technical MVP |

**Decision:** Native Android with **Kotlin** offers the best balance of performance, maintainability, and future-proofing.

---

## 3. Technical Requirements

| Component   | Specification         | Solution for some sanctioned people                                                                            |
|-------------|----------------------|---------------------------------------------------------------------------------------------------------------|
| **IDE**     | Android Studio Giraffe, Hedgehog | Download from mirrors or offline ZIP                                                              |
| **SDK**     | compileSdk 33, minSdk 22, targetSdk 33 | Available in SDK Manager                                                                    |
| **Build System** | Gradle 7.6+         | Use Iranian/Chinese mirrors (always works):<br>`maven { url 'https://repo.hut.ir/maven' }`<br>`maven { url 'https://maven.aliyun.com/repository/public' }` |
| **Key Libraries** | Leanback, Media3 ExoPlayer, Coil | All available via mirrors                                                                  |
| **Google Services** | None              | Completely avoided → Amazon/local alternatives                                                              |

---

## 4. Best Practices & TV-Specific Guidelines

- 10-foot UI: Buttons ≥ 150×70 dp, 60 dp spacing, clear focus highlights
- Navigation: D-pad support via onKeyDown(), Leanback Fragments
- Performance: Async loading, Coil image caching, multiDex for low-RAM devices
- Accessibility: `android:contentDescription` on every focusable element
- Security: HTTPS only, minimal permissions
- 2025 requirements: TLS 1.3+, AV1 codec support, 1 GB RAM optimization

---

## 5. Team Workflow & Testing

```script
# Connect wirelessly
adb connect 192.168.1.XX:5555

# Install debug build
adb install app-debug.apk

# Live logs (filter your app)
adb logcat | grep SOD
```

Workflow:

- Clone → Android Studio → Build → ADB install → Test on real Fire TV Stick
- Issues format: `[SOD-10] <Android TV app with video streaming, D-pad navigation, and TV-optimized UI>`
- Weekly sync (Slack/Discord)

---

## 6. Amazon Appstore Publishing Process

1. Create developer account at [developer.amazon.com](https://developer.amazon.com)
2. Upload signed APK
3. Target Fire TV devices only
4. Provide 1920×1080 screenshots, Privacy Policy URL
5. Submit → Review (1--3 business days)

**Common rejection reasons (2025):**

- Missing D-pad navigation
- Crashes on 1 GB RAM devices
- Unnecessary permissions
- Non-family-friendly content
- Missing Amazon IAP (if monetized)

---

## 7. Challenges & Solutions

| Challenge           | Impact               | Solution                     |
|---------------------|---------------------|------------------------------|
| Low RAM (1 GB)      | Crashes, lag        | multiDex, Coil, avoid heavy libraries    |
| D-pad navigation    | Focus loss          | Leanback, manual onKeyDown handling     |
| Video buffering     | Playback stuttering | ExoPlayer + caching, preload next segment |
| Device fragmentation| Inconsistent behavior | Test on Lite, 4K, 4K Max          |
| Appstore rejection  | Delayed launch      | Follow Amazon Content Policy strictly   |

---

## 8. Comparison with Standard Android Apps

| Aspect            | Regular Android App    | Fire TV App                         |
|-------------------|-----------------------|-------------------------------------|
| Services          | Google Play Services  | Amazon Appstore Services (A3L, IAP) |
| Input             | Touch                 | Remote (D-pad + voice)              |
| UI Framework      | Material Design       | Leanback / 10-foot UI               |
| Testing           | Phone emulator        | Real Fire TV Stick required         |
| Distribution      | Google Play           | Amazon Appstore (TV-specific assets)|

---

## 9. Recommendations & Next Steps

- Migrate POC to Kotlin (v0.2) -- reduces code ~40%, null-safety
- Physical device testing on multiple Fire TV models
- Prepare signed APK for Amazon Appstore submission
- Future features: Voice search, offline cache, analytics

---

## References

- Amazon Fire TV Developer Docs
- Fire App Builder Overview
- Android TV Quality Guidelines
- Enveu Fire TV Guide

---

**Demo App Repository:** https://github.com/HoloX-co/SOD-10  
**Release:** `v0.1-poc` (Java) -- ready for Kotlin migration