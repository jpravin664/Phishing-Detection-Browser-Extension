import pandas as pd
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    ConfusionMatrixDisplay
)
import joblib
import os

# ==============================
# Create Output Folder
# ==============================
output_dir = os.path.join(os.path.dirname(__file__), 'Output')
os.makedirs(output_dir, exist_ok=True)

# ==============================
# Load Dataset
# ==============================
csv_path = os.path.join(os.path.dirname(__file__), 'data/phishing_urls.csv')
df = pd.read_csv(csv_path)

# ==============================
# Feature Selection
# ==============================
X = pd.DataFrame({
    'hasHttps': df['IsHTTPS'].astype(int),
    'length': df['URLLength'],
    'subdomainCount': df['NoOfSubDomain'],
    'specialCharCount': df['NoOfOtherSpecialCharsInURL']
})

y = df['label']

# ==============================
# Train/Test Split
# ==============================
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# ==============================
# Train Random Forest Model
# ==============================
clf = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

clf.fit(X_train, y_train)

# ==============================
# Predictions
# ==============================
y_pred = clf.predict(X_test)

# ==============================
# Accuracy
# ==============================
accuracy = accuracy_score(y_test, y_pred)

print(f"\n✅ Model Accuracy: {accuracy * 100:.2f}%")

# ==============================
# Classification Report
# ==============================
print("\n📊 Classification Report:")
print(classification_report(y_test, y_pred))

# ==============================
# Confusion Matrix
# ==============================
cm = confusion_matrix(y_test, y_pred)

print("\n📌 Confusion Matrix:")
print(cm)

# ==============================
# Save Confusion Matrix Diagram
# ==============================
plt.figure(figsize=(6, 6))
disp = ConfusionMatrixDisplay(confusion_matrix=cm)
disp.plot()

conf_matrix_path = os.path.join(output_dir, 'confusion_matrix.png')
plt.savefig(conf_matrix_path, bbox_inches='tight')
plt.close()

print(f"\n✅ Confusion Matrix saved at: {conf_matrix_path}")

# ==============================
# Save Accuracy Bar Chart
# ==============================
plt.figure(figsize=(5, 5))
plt.bar(['Accuracy'], [accuracy * 100])
plt.ylim(0, 100)
plt.ylabel('Percentage')
plt.title('Model Accuracy')

accuracy_chart_path = os.path.join(output_dir, 'accuracy_chart.png')
plt.savefig(accuracy_chart_path, bbox_inches='tight')
plt.close()

print(f"✅ Accuracy Chart saved at: {accuracy_chart_path}")

# ==============================
# Feature Importance Graph
# ==============================
feature_importance = clf.feature_importances_
feature_names = X.columns

plt.figure(figsize=(8, 5))
plt.bar(feature_names, feature_importance)
plt.xlabel('Features')
plt.ylabel('Importance Score')
plt.title('Feature Importance')

feature_chart_path = os.path.join(output_dir, 'feature_importance.png')
plt.savefig(feature_chart_path, bbox_inches='tight')
plt.close()

print(f"✅ Feature Importance Chart saved at: {feature_chart_path}")

# ==============================
# Save Model
# ==============================
model_path = os.path.join(os.path.dirname(__file__), 'random_forest.pkl')
joblib.dump(clf, model_path)

print(f"\n✅ Model trained and saved at: {model_path}")