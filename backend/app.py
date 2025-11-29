from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import pickle
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.metrics import accuracy_score, f1_score, confusion_matrix
import warnings
warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app)

# Global variables to store models and data
model = None
imputer = None
label_encoders = {}
df = None
data = None
recommendation_system = None

def load_and_preprocess_data():
    """Load and preprocess the dataset"""
    global df, data, imputer, label_encoders
    
    # For demo purposes, we'll use a sample dataset path
    # In production, this should be configurable
    dataset_path = os.getenv('DATASET_PATH', 'data/2012-2013-data-with-predictions-4-final.csv')
    
    try:
        df = pd.read_csv(dataset_path)
    except FileNotFoundError:
        # If dataset not found, create a sample dataset for demo
        print("Dataset not found. Creating sample data for demo...")
        df = create_sample_data()
    
    # Preprocessing steps from notebook
    irrelevant_columns = [
        'problem_log_id', 'problem_id', 'user_id', 'teacher_id',
        'school_id', 'answer_id', 'answer_text', 'actions', 'tutor_mode', 'skill'
    ]
    data = df.drop(columns=[col for col in irrelevant_columns if col in df.columns])
    
    # Handle datetime columns
    if 'start_time' in data.columns and 'end_time' in data.columns:
        data['start_time'] = data['start_time'].astype(str).str.split('.').str[0]
        data['end_time'] = data['end_time'].astype(str).str.split('.').str[0]
        data['start_time'] = pd.to_datetime(data['start_time'], format="%Y-%m-%d %H:%M:%S", errors='coerce')
        data['end_time'] = pd.to_datetime(data['end_time'], format="%Y-%m-%d %H:%M:%S", errors='coerce')
        data['time_taken'] = (data['end_time'] - data['start_time']).dt.total_seconds()
        data = data.drop(columns=['start_time', 'end_time'])
    
    # Label encoding for categorical columns
    categorical_columns = ['skill_id', 'problem_type', 'first_action', 'type']
    for col in categorical_columns:
        if col in data.columns:
            label_encoders[col] = LabelEncoder()
            data[col] = label_encoders[col].fit_transform(data[col].astype(str))
    
    # Handle missing values
    imputer = SimpleImputer(strategy='most_frequent')
    return True

def create_sample_data():
    """Create sample data for demo purposes"""
    np.random.seed(42)
    n_samples = 1000
    
    sample_data = {
        'problem_log_id': range(n_samples),
        'problem_id': np.random.randint(1000, 2000, n_samples),
        'user_id': np.random.randint(1, 100, n_samples),
        'assignment_id': np.random.randint(1, 50, n_samples),
        'assistment_id': np.random.randint(1, 200, n_samples),
        'start_time': pd.date_range('2012-01-01', periods=n_samples, freq='1H'),
        'end_time': pd.date_range('2012-01-01 00:05:00', periods=n_samples, freq='1H'),
        'problem_type': np.random.choice(['type1', 'type2', 'type3'], n_samples),
        'original': np.random.randint(0, 2, n_samples),
        'correct': np.random.randint(0, 2, n_samples),
        'bottom_hint': np.random.choice([0, 1, None], n_samples, p=[0.7, 0.2, 0.1]),
        'hint_count': np.random.randint(0, 5, n_samples),
        'attempt_count': np.random.randint(1, 10, n_samples),
        'ms_first_response': np.random.randint(1000, 60000, n_samples),
        'tutor_mode': np.random.choice(['tutor', 'no-tutor'], n_samples),
        'sequence_id': np.random.randint(1, 100, n_samples),
        'student_class_id': np.random.randint(1, 20, n_samples),
        'position': np.random.randint(1, 50, n_samples),
        'type': np.random.choice(['A', 'B', 'C'], n_samples),
        'base_sequence_id': np.random.randint(1, 50, n_samples),
        'skill_id': np.random.choice([359.0, 393.0, 400.0, 450.0], n_samples),
        'overlap_time': np.random.randint(0, 1000, n_samples),
        'template_id': np.random.randint(1, 100, n_samples),
        'first_action': np.random.choice(['action1', 'action2', 'action3'], n_samples),
        'problemlogid': range(n_samples),
        'Average_confidence(FRUSTRATED)': np.random.uniform(0, 1, n_samples),
        'Average_confidence(CONFUSED)': np.random.uniform(0, 1, n_samples),
        'Average_confidence(CONCENTRATING)': np.random.uniform(0.3, 1, n_samples),
        'Average_confidence(BORED)': np.random.uniform(0, 0.5, n_samples),
        'skill': np.random.choice(['Algebra', 'Geometry', 'Trigonometry'], n_samples),
        'teacher_id': np.random.randint(1, 10, n_samples),
        'school_id': np.random.randint(1, 5, n_samples),
        'answer_id': np.random.randint(1, 1000, n_samples),
        'answer_text': ['answer_' + str(i) for i in range(n_samples)],
        'actions': np.random.randint(1, 20, n_samples),
    }
    
    return pd.DataFrame(sample_data)

def train_model():
    """Train the prediction model"""
    global model, imputer
    
    # Select features based on notebook
    feature_columns = ['attempt_count', 'hint_count', 'bottom_hint', 'time_taken', 
                      'first_action', 'ms_first_response', 'overlap_time',
                      'Average_confidence(CONCENTRATING)', 'Average_confidence(BORED)']
    
    # Filter to only columns that exist
    available_features = [col for col in feature_columns if col in data.columns]
    X = data[available_features].copy()
    y = data['correct'].astype(int)
    
    # Impute missing values
    X_imputed = pd.DataFrame(imputer.fit_transform(X), columns=X.columns)
    
    # Train model
    model = RandomForestClassifier(n_estimators=100, max_depth=20, random_state=42)
    model.fit(X_imputed, y)
    
    return True

def setup_recommendation_system():
    """Setup the recommendation system"""
    global recommendation_system, df
    
    if df is None:
        return False
    
    # Identify weak skills for each student
    incorrect_answers = df[df['correct'] == 0]
    student_weak_skills = incorrect_answers.groupby('user_id')['skill_id'].apply(
        lambda x: ', '.join(map(str, x.dropna().unique()))
    ).reset_index()
    student_weak_skills.rename(columns={'skill_id': 'weak_skills'}, inplace=True)
    
    # Prepare resources
    resource_skills = df[['problem_id', 'skill_id']].drop_duplicates()
    resource_skills['skill_id'] = resource_skills['skill_id'].astype(str)
    
    # Combine for TF-IDF
    combined_skills = pd.concat([
        student_weak_skills['weak_skills'],
        resource_skills['skill_id']
    ], axis=0).fillna('')
    
    # Vectorize
    vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
    skills_tfidf = vectorizer.fit_transform(combined_skills)
    
    student_skills_tfidf = skills_tfidf[:len(student_weak_skills)]
    resource_skills_tfidf = skills_tfidf[len(student_weak_skills):]
    
    recommendation_system = {
        'student_weak_skills': student_weak_skills,
        'resource_skills': resource_skills,
        'student_skills_tfidf': student_skills_tfidf,
        'resource_skills_tfidf': resource_skills_tfidf,
        'vectorizer': vectorizer
    }
    
    return True

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'API is running'})

@app.route('/api/predict', methods=['POST'])
def predict():
    """Predict if a student will answer correctly"""
    try:
        if model is None:
            return jsonify({'error': 'Model not trained'}), 500
        
        data_input = request.json
        
        # Extract features
        feature_columns = ['attempt_count', 'hint_count', 'bottom_hint', 'time_taken',
                          'first_action', 'ms_first_response', 'overlap_time',
                          'Average_confidence(CONCENTRATING)', 'Average_confidence(BORED)']
        
        # Prepare input data
        input_data = {}
        for col in feature_columns:
            if col in data_input:
                input_data[col] = data_input[col]
            else:
                input_data[col] = 0  # Default value
        
        # Create DataFrame
        input_df = pd.DataFrame([input_data])
        
        # Handle label encoding for categorical features
        if 'first_action' in input_df.columns and 'first_action' in label_encoders:
            try:
                input_df['first_action'] = label_encoders['first_action'].transform([str(input_data.get('first_action', '0'))])[0]
            except:
                input_df['first_action'] = 0
        
        # Impute missing values
        input_imputed = pd.DataFrame(imputer.transform(input_df), columns=input_df.columns)
        
        # Make prediction
        prediction = model.predict(input_imputed)[0]
        probability = model.predict_proba(input_imputed)[0]
        
        return jsonify({
            'prediction': int(prediction),
            'probability': {
                'correct': float(probability[1]),
                'incorrect': float(probability[0])
            },
            'message': 'Will answer correctly' if prediction == 1 else 'Will answer incorrectly'
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/recommend', methods=['POST'])
def recommend():
    """Get recommendations for a student"""
    try:
        if recommendation_system is None:
            return jsonify({'error': 'Recommendation system not initialized'}), 500
        
        data_input = request.json
        student_id = int(data_input.get('student_id'))
        top_n = int(data_input.get('top_n', 5))
        
        student_weak_skills = recommendation_system['student_weak_skills']
        resource_skills = recommendation_system['resource_skills']
        student_skills_tfidf = recommendation_system['student_skills_tfidf']
        resource_skills_tfidf = recommendation_system['resource_skills_tfidf']
        
        # Check if student exists
        if student_id not in student_weak_skills['user_id'].values:
            return jsonify({'error': f'Student ID {student_id} not found'}), 404
        
        # Get student vector
        student_index = student_weak_skills[student_weak_skills['user_id'] == student_id].index[0]
        student_vector = student_skills_tfidf[student_index]
        
        # Compute similarity
        similarities = cosine_similarity(student_vector, resource_skills_tfidf).flatten()
        top_indices = similarities.argsort()[-top_n:][::-1]
        
        # Get recommendations
        recommendations = resource_skills.iloc[top_indices].copy()
        recommendations['similarity_score'] = similarities[top_indices]
        
        # Format response
        result = []
        for idx, row in recommendations.iterrows():
            result.append({
                'problem_id': int(row['problem_id']),
                'skill_id': str(row['skill_id']),
                'similarity_score': float(row['similarity_score'])
            })
        
        return jsonify({
            'student_id': student_id,
            'recommendations': result
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    """Get model performance metrics"""
    try:
        if model is None:
            return jsonify({'error': 'Model not trained'}), 500
        
        # Use a sample of test data for metrics
        feature_columns = ['attempt_count', 'hint_count', 'bottom_hint', 'time_taken',
                          'first_action', 'ms_first_response', 'overlap_time',
                          'Average_confidence(CONCENTRATING)', 'Average_confidence(BORED)']
        
        available_features = [col for col in feature_columns if col in data.columns]
        X = data[available_features].copy()
        y = data['correct'].astype(int)
        
        # Sample for faster computation
        sample_size = min(10000, len(X))
        X_sample = X.sample(n=sample_size, random_state=42)
        y_sample = y.loc[X_sample.index]
        
        # Impute and predict
        X_imputed = pd.DataFrame(imputer.transform(X_sample), columns=X_sample.columns)
        y_pred = model.predict(X_imputed)
        
        # Calculate metrics
        accuracy = accuracy_score(y_sample, y_pred)
        f1 = f1_score(y_sample, y_pred, average='weighted')
        cm = confusion_matrix(y_sample, y_pred).tolist()
        
        return jsonify({
            'accuracy': float(accuracy),
            'f1_score': float(f1),
            'confusion_matrix': cm,
            'sample_size': sample_size
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/students', methods=['GET'])
def get_students():
    """Get list of available student IDs"""
    try:
        if df is None:
            return jsonify({'error': 'Dataset not loaded'}), 500
        
        student_ids = df['user_id'].unique().tolist()[:100]  # Limit to 100 for demo
        return jsonify({
            'students': sorted(student_ids),
            'total': len(df['user_id'].unique())
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Initialize before running
    print("Starting application...")
    load_and_preprocess_data()
    train_model()
    setup_recommendation_system()
    print("Application ready!")
    app.run(debug=True, port=5000)

