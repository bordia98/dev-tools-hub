# Developer Tools Hub & Context Directory

> Centralized routing directory and context table cataloging 6 private, in-browser developer utility web applications hosted on GitHub Pages.

[![Live Hub](https://img.shields.io/badge/Live_Hub-bordia98.github.io%2Fdev--tools--hub-6366f1?style=for-the-badge&logo=githubpages&logoColor=white)](https://bordia98.github.io/dev-tools-hub/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)
[![Zero Backend](https://img.shields.io/badge/Backend-100%25_Client--Side-blue?style=for-the-badge)]()

---

## 🧭 Project Context Table & Routing Matrix

| # | Tool Name | Category | Hosted Routing URL | GitHub Repository | Work & Capabilities |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **1** | **[Unix Timestamp Converter](https://bordia98.github.io/timestamp-converter/)** | Time & Date | `https://bordia98.github.io/timestamp-converter/` | [bordia98/timestamp-converter](https://github.com/bordia98/timestamp-converter) | Bidirectional conversion between Unix epoch timestamps and human dates. Multi-timezone comparison (UTC, EST, PST, GMT, JST, IST), live real-time clocks, relative humanized time, and line-by-line batch converter. |
| **2** | **[URL Encoder & Decoder](https://bordia98.github.io/url-encoder-decoder/)** | Web & Network | `https://bordia98.github.io/url-encoder-decoder/` | [bordia98/url-encoder-decoder](https://github.com/bordia98/url-encoder-decoder) | Fast percent-encoding and decoding for URLs and URI components. Interactive query string parameter parser with table breakdown, Base64 URL-safe conversion, and automated format detection. |
| **3** | **[UUID & Hash Generator](https://bordia98.github.io/uuid-hash-generator/)** | Security & Crypto | `https://bordia98.github.io/uuid-hash-generator/` | [bordia98/uuid-hash-generator](https://github.com/bordia98/uuid-hash-generator) | Generate cryptographically secure UUID v4 (random) and UUID v7 (time-ordered) tokens. Compute cryptographic hashes (SHA-256, MD5, SHA-512, SHA-1), HMAC generator with secret key, and local file checksums. |
| **4** | **[JWT Decoder](https://bordia98.github.io/JWTDecoder/)** | Security & Auth | `https://bordia98.github.io/JWTDecoder/` | [bordia98/JWTDecoder](https://github.com/bordia98/JWTDecoder) | In-browser JSON Web Token decoder with syntax coloring. Inspect token header and payload claims (`exp`, `iat`, `sub`, `iss`, `aud`), verify expiration status, with zero data transmission or logging. |
| **5** | **[JSON Beautifier](https://bordia98.github.io/JsonBeautifier/)** | Data & Formatting | `https://bordia98.github.io/JsonBeautifier/` | [bordia98/JsonBeautifier](https://github.com/bordia98/JsonBeautifier) | Online JSON formatter, validator, syntax highlighter, and minifier. Precise line-and-column syntax error indicator, string escaping/unescaping, and customizable tab/space indentation. |
| **6** | **[Base64 Text Converter](https://bordia98.github.io/Base64EncoderAndDecoder/)** | Encoding & Decoding | `https://bordia98.github.io/Base64EncoderAndDecoder/` | [bordia98/Base64EncoderAndDecoder](https://github.com/bordia98/Base64EncoderAndDecoder) | Bidirectional Base64 text encoding and decoding with full UTF-8 Unicode support. URL-safe Base64 conversion mode (`-` and `_` substitutes), and instant real-time conversion as you type. |

---

## ✨ Features of the Hub

- **Dual View Modes**: Switch between an information-dense **Context Table** and a visual **Cards Grid**.
- **Instant Search & Filter**: Real-time searching across tool names, descriptions, and keywords.
- **Category Navigation**: Filter by `Time & Date`, `Web & Network`, `Security & Crypto`, `Security & Auth`, `Data & Formatting`, and `Encoding & Decoding`.
- **Command Palette (`Cmd + K` / `Ctrl + K`)**: Keyboard-driven launcher for rapid access. Press `/` to focus the search bar directly.
- **Quick Inspector**: Modal drawer detailing technical capabilities, endpoints, and sample usage.
- **One-Click URL Copying**: Instant clipboard copy feedback for hosted URLs.
- **Modern Design**: Dark/Light mode theme engine with system detection and local persistence.
- **100% Client-Side & Private**: All 6 tools run exclusively in your browser with zero remote data collection.

---

## 🚀 Local Development & Preview

No build step or dependencies required. Simply open `index.html` in any browser or run a lightweight local server:

```bash
# Using Python
python3 -m http.server 8080

# Or using Node.js npx
npx serve .
```

Then navigate to `http://localhost:8080`.

---

## 📦 Pushing to GitHub & Enabling GitHub Pages

To publish this repository and make the Hub live at `https://bordia98.github.io/dev-tools-hub/`:

```bash
# 1. Initialize git (if not already done)
cd dev-tools-hub

# 2. Add remote origin
git remote add origin https://github.com/bordia98/dev-tools-hub.git

# 3. Rename branch and push
git branch -M main
git push -u origin main
```

Next, in your GitHub repository settings:
1. Go to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **Deploy from a branch**.
3. Select branch **`main`** and folder **`/ (root)`**.
4. Click **Save**.

Your directory hub will be live at:
`https://bordia98.github.io/dev-tools-hub/`

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
