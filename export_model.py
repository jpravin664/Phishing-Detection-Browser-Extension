import joblib
import m2cgen as m2c
import os

# Paths
dir_model = os.path.dirname(__file__)
model_path = os.path.join(dir_model, 'random_forest.pkl')
ext_path = os.path.join(dir_model, '/extension/utils/randomForestModel.js')

# Load
model = joblib.load(model_path)

# Core JS scoring code
js_core = m2c.export_to_javascript(model)

# Wrapper to provide a .predict() method over arrays of samples
template = r'''
export class RandomForestClassifier {
  constructor() {}
  predict(X) {
    return X.map(row => {
      const scores = score(row);
      // scores[0] = non-phish, scores[1] = phish
      return scores[1] > scores[0] ? 1 : 0;
    });
  }
}
'''

# Write all at once
with open(ext_path, 'w') as f:
    f.write(js_core + '\n' + template)
print(f"✅ Model exported with wrapper to {ext_path}")