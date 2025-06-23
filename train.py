import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib
import os

# Load the dataset
csv_path = os.path.join(os.path.dirname(__file__), '/data/phishing_urls.csv')
df = pd.read_csv(csv_path)

# Select only URL‐based features to match extractor
# Mapping: hasHttps ← IsHTTPS, length ← URLLength,
# subdomainCount ← NoOfSubDomain, specialCharCount ← NoOfOtherSpecialCharsInURL
X = pd.DataFrame({
    'hasHttps': df['IsHTTPS'].astype(int),
    'length': df['URLLength'],
    'subdomainCount': df['NoOfSubDomain'],
    'specialCharCount': df['NoOfOtherSpecialCharsInURL']
})
y = df['label']

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Fit
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Persist model
model_path = os.path.join(os.path.dirname(__file__), 'random_forest.pkl')
joblib.dump(clf, model_path)
print(f"✅ Model trained and saved at {model_path}")