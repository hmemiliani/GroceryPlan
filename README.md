
# 🛒 GroceryPlan - Your Ultimate Shopping Companion

**GroceryPlan** is a React Native application designed to help you organize and manage your shopping lists with ease. Specifically built for Android devices. 🚀

---

## 🌟 Features

- 📋 **Organized Lists**: Categorize your products efficiently.
- 🔄 **Real-Time Updates**: Add, edit, and delete products effortlessly.
- 📊 **Progress Tracking**: Visualize your progress with pie charts.
- 📤 **Share Your List**: Easily share lists via WhatsApp, SMS, or other apps.
- 🌙 **Dark and Light Modes**: Customize the app's appearance to suit your style.

---

## 🛠️ Environment Setup

### 1️⃣ **Install Yarn**

GroceryPlan uses **Yarn** for dependency management. Install it globally by running the following commands:

```bash
# For Windows (using npm)
npm install -g yarn

# For macOS (using Homebrew)
brew install yarn
```

Verify the installation:

```bash
yarn --version
```

---

### 2️⃣ **Install Android Studio**

GroceryPlan is designed for Android devices. Follow these steps to install and configure Android Studio:

#### 👉 **Download and Install Android Studio**

1. Download Android Studio from the [official site](https://developer.android.com/studio).
2. Complete the installation using the setup wizard.

#### 👉 **Configure Android Studio**

1. Open Android Studio and go to **SDK Manager**.
2. Install the following SDK components:
   - **Android SDK Platform** (latest version).
   - **Android SDK Build Tools**.
   - **Android Emulator**.
   - **Command Line Tools**.

#### 👉 **Configure NDK**

1. Navigate to **SDK Manager** > **SDK Tools**.
2. Select and install the **NDK (Native Development Kit)**.

#### 👉 **Set Up Environment Variables**

For Windows:
1. Locate your SDK path (e.g., `C:\Users\<YourUser>\AppData\Local\Android\Sdk`).
2. Add this path to your system's environment variables (`PATH`).

---

### 3️⃣ **macOS Environment Setup**

While GroceryPlan is Android-only, here’s how to prepare your macOS environment:

1. Install [Homebrew](https://brew.sh):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Install the required dependencies:
   ```bash
   brew install node watchman
   ```

3. Follow the Android Studio configuration steps mentioned above.

---

## 🚀 Running GroceryPlan

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/hmemiliani/GroceryPlan.git
   cd GroceryPlan
   ```

2. **Install Dependencies**:
   ```bash
   yarn install
   ```

3. **Start Metro Bundler**:
   ```bash
   yarn start
   ```

4. **Run the Android App**:
   ```bash
   yarn android
   ```

---

## 🛡️ Troubleshooting

### ❌ **Missing SDK or NDK**

Ensure all required components are installed in the **SDK Manager** of Android Studio.

### ❌ **Emulator Not Starting**

Manually launch the emulator from **AVD Manager** in Android Studio.

### ❌ **Metro Bundler Not Connecting**

1. Kill any running Metro processes:
   ```bash
   npx react-native kill-packager
   ```

2. Restart Metro:
   ```bash
   yarn start --reset-cache
   ```

---

## 🌈 About the Project

GroceryPlan is built with simplicity and usability in mind. It's perfect for everyday users and developers looking to explore the world of **React Native**.

> **Note**: Currently, this application is optimized for Android only.

---

## 📚 Useful Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Android Studio Setup](https://developer.android.com/studio)
- [Yarn Documentation](https://classic.yarnpkg.com/en/docs)

---

## ❤️ Contributions

Contributions are welcome! Feel free to fork this project and submit your pull requests. 🚀

---

### 🖼️ Preview

![GroceryPlan Screenshot](https://res.cloudinary.com/djsxw9zeu/image/upload/v1736189445/n1jani9osfnupsnftdut.png)  
_A sneak peek at GroceryPlan in action!_

---

Thank you for using GroceryPlan! ✨
