import { RandomForestClassifier } from './randomForestModel.js';
const clf = new RandomForestClassifier();

export async function mlDetect(features) {
  const vals = Object.values(features);
  const pred = clf.predict([vals])[0];
  return pred === 1;
}