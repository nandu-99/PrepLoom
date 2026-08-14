import type { SubjectTopic } from "@/lib/subject-content";

export const introductionToMachineLearning: SubjectTopic = {
  slug: "introduction-to-machine-learning",
  title: "Introduction to Machine Learning",
  description:
    "Understand what a machine-learning model learns, how it differs from fixed rules, and when it is useful.",
  readTime: "12 min",
  difficulty: "Foundation",
  tags: ["Machine Learning", "Model", "Prediction"],
  learn: {
    opening:
      "Machine learning helps a computer learn a useful pattern from examples instead of requiring a programmer to write every decision rule by hand.",
    sections: [
      {
        title: "Start With a Familiar Problem",
        paragraphs: [
          "Imagine an email service that must decide whether a new message is spam. We could write rules such as: if the message contains a certain word, mark it as spam. Real messages are more complicated. Spammers change their words, and a normal message may also contain those words.",
          "A machine-learning system studies many past emails and their correct labels. It learns which combinations of words, links, senders, and other signals are useful. It then uses that learned pattern to classify a new email.",
        ],
      },
      {
        title: "AI, Machine Learning, and Deep Learning",
        paragraphs: [
          "Artificial Intelligence is the broad goal of making computers perform tasks that appear intelligent. Machine Learning is one approach inside AI: it learns patterns from data. Deep Learning is a part of Machine Learning that uses multi-layer neural networks.",
          "PrepLoom keeps ML and DL as separate subjects so that classical ML foundations are learned before neural networks.",
        ],
        flow: ["Artificial Intelligence", "Machine Learning", "Deep Learning"],
      },
      {
        title: "Fixed Rules and Learned Patterns",
        paragraphs: [
          "Traditional programming starts with rules written by a programmer. The computer applies those rules to input data and produces an answer.",
          "Supervised machine learning starts with examples and their known answers. A learning algorithm searches for model parameters that connect the inputs to the answers.",
        ],
        table: {
          headers: ["Traditional program", "Machine-learning system"],
          rows: [
            ["Rules + data produce answers", "Data + known answers produce a model"],
            ["A programmer writes the decision logic", "An algorithm estimates the decision pattern"],
            ["Best when rules are clear and stable", "Useful when patterns are complex but examples exist"],
          ],
        },
      },
      {
        title: "What Exactly Is Learned?",
        paragraphs: [
          "A model is a mathematical mapping from input values to an output. Training adjusts the model's parameters so that its outputs become closer to the correct answers in the training data.",
          "For a house-price model, area and number of bedrooms may be inputs. The learned parameters describe how strongly those inputs affect the predicted price.",
        ],
        dataTable: {
          headers: ["Term", "Simple meaning", "House-price example"],
          rows: [
            ["Example or sample", "One item in the dataset", "One house"],
            ["Feature", "Information given to the model", "Area"],
            ["Target", "Answer to learn or predict", "Sale price"],
            ["Algorithm", "Procedure that learns from data", "Linear regression training"],
            ["Model", "The learned mapping", "The fitted price equation"],
            ["Parameter", "A value learned during training", "A coefficient"],
            ["Hyperparameter", "A setting chosen before or around training", "Regularization strength"],
            ["Loss", "A number measuring prediction error", "Difference from the true price"],
            ["Prediction", "Output for a new input", "Estimated price"],
          ],
        },
        formulas: [
          {
            label: "Model notation",
            expression: "ŷ = f(X; θ)",
            note: "X is the input, θ contains learned parameters, and ŷ is the prediction.",
          },
        ],
      },
      {
        title: "Training and Inference",
        paragraphs: [
          "Training is the learning stage. The algorithm repeatedly examines training examples, measures errors, and adjusts the model.",
          "Inference is the usage stage. The trained model receives a new input and produces a prediction. Inference normally does not change the model.",
        ],
        table: {
          headers: ["Training", "Inference"],
          rows: [
            ["Learns from historical examples", "Uses the learned model on new data"],
            ["Adjusts model parameters", "Keeps parameters fixed"],
            ["Usually requires more computation", "Usually needs a quick prediction"],
          ],
        },
      },
      {
        title: "The Basic Workflow",
        paragraphs: [
          "A useful ML system begins with a clearly defined problem and ends with an honest test on unseen data. Training a model is only one part of that process.",
        ],
        visual: {
          src: "/notes/machine-learning/ml-workflow.png",
          alt: "Machine-learning workflow from defining the task through final testing",
          width: 1536,
          height: 1024,
          caption:
            "Validation helps us make choices. The untouched test set measures the final result.",
        },
      },
      {
        title: "When Machine Learning Is a Good Choice",
        paragraphs: [
          "Machine learning is useful when the desired pattern is difficult to express as reliable hand-written rules, enough relevant examples are available, and the result can be measured.",
        ],
        points: [
          "The same type of decision must be made many times.",
          "Past examples contain information about future cases.",
          "A clear metric can tell us whether the model is improving.",
          "The environment is stable enough for past patterns to remain useful.",
        ],
      },
      {
        title: "When Simple Rules Are Better",
        paragraphs: [
          "Machine learning is not automatically the best solution. If a correct rule is short, stable, and easy to verify, normal programming is clearer and safer.",
        ],
        points: [
          "Use a formula for a tax calculation whose rules are explicitly defined.",
          "Use validation rules to reject an empty required field.",
          "Do not train a model when there is too little reliable data.",
          "Do not use an inaccurate prediction where every decision must be provably correct.",
        ],
      },
      {
        title: "Check Your Understanding",
        paragraphs: [
          "Classify each situation before thinking about an algorithm. The first question is whether learning from examples is actually needed.",
        ],
        problems: [
          {
            title: "Is learning useful?",
            prompt:
              "A bank wants to estimate whether a transaction looks fraudulent using patterns from millions of reviewed transactions.",
            steps: [
              "The decision depends on many interacting signals.",
              "Reviewed past transactions provide examples and correct labels.",
              "Performance can be measured on unseen transactions.",
            ],
            answer: "This is a suitable machine-learning problem.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How a basic ML system works",
      steps: [
        "Define the input, the required output, and the success measure.",
        "Collect examples that represent the real problem.",
        "Prepare the examples and separate them into training, validation, and test data.",
        "Choose an algorithm and train a model on the training data.",
        "Use validation data to compare choices and improve the system.",
        "Evaluate the finished model once on the untouched test data.",
        "Use the model for inference and monitor whether real data changes over time.",
      ],
    },
    example: {
      title: "Learning to estimate delivery time",
      body: "Past deliveries contain distance, traffic, weather, restaurant preparation time, and actual delivery time. Training learns a relationship between those inputs and the actual time. Inference uses the learned model to estimate the time for a new order.",
    },
    misconception:
      "A model does not understand a problem like a person. It learns statistical relationships from the examples and objective it receives.",
  },
  revise: {
    definitionLabel: "Overview",
    compactDefinition: true,
    definition:
      "Machine learning uses examples to learn a model that can make predictions or find useful patterns in new data.",
    sections: [
      {
        title: "Core Terms",
        dataTable: {
          headers: ["Term", "Meaning"],
          rows: [
            ["Feature", "Input information"],
            ["Target", "Answer to learn"],
            ["Algorithm", "Learning procedure"],
            ["Model", "Learned mapping"],
            ["Parameter", "Value learned during training"],
            ["Hyperparameter", "Setting chosen using validation"],
            ["Loss", "Number measuring prediction error"],
            ["Training", "Learning parameters"],
            ["Inference", "Making a new prediction"],
          ],
        },
      },
      {
        title: "Basic Flow",
        flow: ["Define the task", "Prepare representative data", "Train and validate", "Test once", "Predict new cases"],
      },
      {
        title: "Use ML When",
        points: [
          "Rules are difficult to write but useful examples exist.",
          "The target and success metric are clear.",
          "Past data represents the cases the model will face.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Traditional programming receives rules; ML learns a model from examples.",
      "AI is the broad field, ML learns from data, and DL uses multi-layer neural networks.",
      "Training changes parameters; inference uses fixed learned parameters.",
      "Training adjusts parameters to reduce a loss; hyperparameters control how training is configured.",
      "A model learns patterns present in its data, including unwanted ones.",
      "A simple exact rule is better when the rule is already known.",
    ],
    followUp: "What is the difference between an algorithm and a trained model?",
  },
  lastMinute: {
    definition: "ML learns a mapping or pattern from examples.",
    sections: [
      {
        title: "Remember the Terms",
        points: ["Feature = input", "Target = required answer", "Parameter = learned value", "Hyperparameter = chosen setting", "Loss = prediction error", "Model = learned result"],
      },
      {
        title: "Two Stages",
        points: ["Training learns parameters.", "Inference makes predictions with those parameters."],
      },
      {
        title: "Workflow",
        flow: ["Problem", "Data", "Train", "Validate", "Test", "Predict"],
        wide: true,
      },
    ],
    memoryLine: "Examples teach the algorithm; the result is a model.",
    cues: [
      "Use ML for complex patterns, not for every simple rule.",
      "Representative data is necessary.",
      "Testing must use unseen examples.",
    ],
    trap: "Do not use the words algorithm and model as if they mean the same thing.",
  },
};

export const typesOfMachineLearning: SubjectTopic = {
  slug: "types-of-machine-learning",
  title: "Types of Machine Learning",
  description:
    "Separate supervised and unsupervised learning, then identify regression, classification, and clustering tasks.",
  readTime: "11 min",
  difficulty: "Foundation",
  tags: ["Supervised", "Unsupervised", "Tasks"],
  learn: {
    opening:
      "The easiest way to identify an ML task is to ask two questions: Does the training data contain a target answer, and what kind of output is required?",
    sections: [
      {
        title: "The Essential Split",
        paragraphs: [
          "In supervised learning, every training example includes the answer that the model should learn. In unsupervised learning, the examples contain input features but no target answer.",
          "This distinction determines what the algorithm can learn and how we evaluate it.",
        ],
        visual: {
          src: "/notes/machine-learning/learning-types.png",
          alt: "Supervised learning divides into regression and classification while unsupervised learning includes clustering",
          width: 1536,
          height: 1024,
          caption:
            "The ML subject focuses on the three essential tasks shown here before introducing their algorithms.",
        },
      },
      {
        title: "Supervised Learning",
        paragraphs: [
          "Supervised learning uses labelled examples. Each example contains input features and the correct target. The model learns a mapping from the features to that target.",
          "After training, we compare predictions with known answers on unseen examples. This gives a direct way to measure errors.",
        ],
        points: [
          "House details with their sale prices",
          "Emails marked spam or not spam",
          "Medical measurements with a known diagnosis",
          "Transactions marked genuine or fraudulent",
        ],
      },
      {
        title: "Regression",
        paragraphs: [
          "Regression is supervised learning where the required output is a numerical quantity. Nearby numerical answers have a meaningful distance.",
        ],
        points: [
          "Predict a house price in rupees.",
          "Estimate tomorrow's temperature.",
          "Estimate delivery time in minutes.",
          "Predict monthly electricity consumption.",
        ],
      },
      {
        title: "Classification",
        paragraphs: [
          "Classification is supervised learning where the required output is a category or class. A classifier often produces a probability or score for each class and then uses a decision rule to select the final class.",
        ],
        points: [
          "Binary: spam or not spam",
          "Binary: fraud or genuine",
          "Multiclass: cat, dog, or bird",
          "Multiclass: one handwritten digit from 0 to 9",
        ],
      },
      {
        title: "Unsupervised Learning",
        paragraphs: [
          "Unsupervised learning receives no target labels. It searches for structure in the input data itself.",
          "Because there is no single known answer for each example, evaluating an unsupervised result is less direct. A mathematically compact grouping may still be useless for the real purpose.",
        ],
      },
      {
        title: "Clustering",
        paragraphs: [
          "Clustering places similar examples into groups. The group names are not supplied during training. The result depends on the selected features, their scale, and the method used to measure similarity or distance.",
        ],
        points: [
          "Group customers with similar purchase behaviour.",
          "Group news articles that discuss similar subjects.",
          "Group machines with similar sensor patterns.",
          "Explore whether a dataset contains natural subgroups.",
        ],
      },
      {
        title: "Do Not Decide From the Input",
        paragraphs: [
          "The same input can support different tasks. House details can be used to predict a price, classify whether the price exceeds a limit, or group similar houses.",
          "The required output and the available target labels determine the task type.",
        ],
        dataTable: {
          headers: ["Question", "Target available?", "Task"],
          rows: [
            ["What price will this house sell for?", "Yes: price", "Regression"],
            ["Is this house expensive or affordable?", "Yes: category", "Classification"],
            ["Which houses naturally look similar?", "No", "Clustering"],
          ],
        },
      },
      {
        title: "Practice: Identify the Task",
        paragraphs: [
          "State both the learning type and the task. Explain your answer using the target, not the algorithm name.",
        ],
        problems: [
          {
            title: "Predict examination marks",
            prompt:
              "Past data contains study hours, attendance, and final marks. Predict the final mark for a new student.",
            steps: [
              "Final marks are present for the training examples.",
              "The model therefore has labelled targets.",
              "The required output is a numerical value.",
            ],
            answer: "Supervised learning - regression.",
          },
          {
            title: "Organize customers",
            prompt:
              "A shop has purchase histories but no customer-group labels. It wants to discover groups with similar behaviour.",
            steps: [
              "No correct group is supplied for each customer.",
              "The goal is to discover structure among the inputs.",
              "The required result is a set of similar groups.",
            ],
            answer: "Unsupervised learning - clustering.",
          },
          {
            title: "Detect loan default",
            prompt:
              "Past loan records are marked defaulted or repaid. Predict one of those outcomes for a new application.",
            steps: [
              "Past records contain known answers.",
              "The output is one of two categories.",
              "The target is not a continuous numerical amount.",
            ],
            answer: "Supervised learning - binary classification.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to identify the learning task",
      steps: [
        "Write the exact output the system must produce.",
        "Check whether that output is present as a target in the training data.",
        "If a target exists, the task is supervised learning.",
        "If the target is a number, it is regression.",
        "If the target is a category, it is classification.",
        "If no target exists and the goal is to form similar groups, it is clustering.",
      ],
    },
    example: {
      title: "One hospital dataset, three questions",
      body: "Patient measurements can predict recovery time (regression), predict a diagnosis category (classification), or reveal groups of patients with similar measurements when no diagnosis target is supplied (clustering).",
    },
    misconception:
      "A number is not always a regression target. A pin code or class label written as 0, 1, and 2 is still categorical because arithmetic distance between the codes has no useful meaning.",
  },
  revise: {
    definitionLabel: "Decision Rule",
    compactDefinition: true,
    definition:
      "Target present means supervised learning. A numerical target means regression; a categorical target means classification. No target and a grouping goal means clustering.",
    sections: [
      {
        title: "Task Comparison",
        dataTable: {
          headers: ["Task", "Target", "Output example"],
          rows: [
            ["Regression", "Present and numerical", "Price"],
            ["Classification", "Present and categorical", "Spam / not spam"],
            ["Clustering", "Absent", "Customer groups"],
          ],
        },
      },
      {
        title: "Fast Identification",
        flow: ["Is a target supplied?", "Yes: number or category?", "Number: regression", "Category: classification"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Supervised learning trains with known targets.",
      "Unsupervised learning searches for structure without targets.",
      "Regression predicts a meaningful numerical quantity.",
      "Classification predicts a class.",
      "Clustering discovers similar groups.",
      "Identify the task from the required output, not the input data.",
    ],
    followUp: "Why is a class encoded as 0 or 1 still a classification target?",
  },
  lastMinute: {
    definition: "Use the target to identify the task.",
    sections: [
      {
        title: "Three Tasks",
        points: ["Regression: predict a number", "Classification: predict a class", "Clustering: discover groups"],
      },
      {
        title: "Label Check",
        points: ["Known target: supervised", "No target: unsupervised"],
      },
    ],
    memoryLine: "Number = regression, class = classification, no label + groups = clustering.",
    cues: [
      "Price is numerical.",
      "Spam is categorical.",
      "Customer segments can be discovered without labels.",
    ],
    trap: "A numeric code used as a category does not make the task regression.",
  },
};

export const featuresLabelsAndDatasets: SubjectTopic = {
  slug: "features-labels-and-datasets",
  title: "Features, Labels, and Datasets",
  description:
    "Read a dataset correctly: rows are examples, features are model inputs, and the target is the answer to learn.",
  readTime: "12 min",
  difficulty: "Foundation",
  tags: ["Features", "Labels", "Dataset"],
  learn: {
    opening:
      "Before choosing an algorithm, we must know exactly what one row represents, which columns the model may use, and which column contains the answer.",
    sections: [
      {
        title: "A Dataset Is a Collection of Examples",
        paragraphs: [
          "A tabular dataset is usually organized into rows and columns. Each row is one example or sample. Each column stores one property measured for those examples.",
          "The meaning of one row must be consistent. If one row represents a customer, all feature values in that row should describe that same customer at the relevant time.",
        ],
      },
      {
        title: "Features and Target",
        paragraphs: [
          "Features are the input variables available when the model must make a prediction. The target is the answer the model learns to predict in supervised learning.",
          "The target is also called a label, output, response variable, or dependent variable. Features are also called predictors, attributes, or input variables. Some books say independent variables, but features do not have to be statistically independent of one another.",
        ],
        visual: {
          src: "/notes/machine-learning/dataset-anatomy.png",
          alt: "House dataset showing rows as samples, input columns as features, and price as the target",
          width: 1536,
          height: 1024,
          caption:
            "The model receives area, bedrooms, and age. During training, it also sees the correct price.",
        },
      },
      {
        title: "The Feature Matrix and Target Vector",
        paragraphs: [
          "We commonly write the input table as X and the target column as y. If there are n samples and p features, X has n rows and p columns. The target y has n values, one for every sample.",
          "Raw X may contain categories, dates, or text. After those values are encoded numerically, a numerical feature matrix can be written as X ∈ ℝⁿˣᵖ.",
        ],
        formulas: [
          {
            label: "Feature matrix",
            expression: "X ∈ ℝⁿˣᵖ",
            note: "For a numerically encoded matrix: n = samples and p = features.",
          },
          {
            label: "Target vector",
            expression: "y = [y₁, y₂, …, yₙ]ᵀ",
            note: "Each yᵢ is the target belonging to row i of X.",
          },
          {
            label: "One training example",
            expression: "(xᵢ, yᵢ)",
            note: "xᵢ contains the features for example i; yᵢ is its known answer.",
          },
        ],
      },
      {
        title: "Common Feature Types",
        paragraphs: [
          "A feature's meaning determines how it should be prepared. A value stored as a number is not automatically numerical in the mathematical sense.",
        ],
        dataTable: {
          headers: ["Feature type", "Meaning", "Example"],
          rows: [
            ["Continuous numerical", "Measured quantity", "Height, temperature"],
            ["Discrete numerical", "Count", "Number of purchases"],
            ["Nominal categorical", "Names with no order", "City, blood group"],
            ["Ordinal categorical", "Categories with an order", "Low, medium, high"],
            ["Binary", "Two possible states", "Yes / no"],
            ["Date or time", "Time information with structure", "Order date"],
          ],
        },
      },
      {
        title: "Useful Features Must Be Available at Prediction Time",
        paragraphs: [
          "A column may strongly predict the target but still be invalid. The model may only use information that exists at the moment when a real prediction will be made.",
          "For example, a hospital model that predicts whether a patient will be readmitted cannot use a column filled in after the next admission occurs. That column reveals the future answer.",
        ],
      },
      {
        title: "Identifiers Are Usually Not Explanatory Features",
        paragraphs: [
          "A student ID, invoice number, or database row number identifies an example but usually does not describe it. Feeding such a number directly to a model can create meaningless patterns.",
          "An identifier may still be useful for joining tables or tracking predictions. It should normally be kept outside the model's feature set.",
        ],
      },
      {
        title: "Dataset Quality Matters",
        paragraphs: [
          "A large dataset is not automatically a good dataset. The examples must represent the population and conditions where the model will be used.",
        ],
        points: [
          "Coverage: important types of real cases are present.",
          "Correctness: measurements and labels are reasonably accurate.",
          "Consistency: columns use the same meaning and units.",
          "Timeliness: the examples are not too old for the current problem.",
          "Balance: rare but important classes are not accidentally missing.",
          "Duplicates: repeated rows do not accidentally give some examples extra importance.",
        ],
      },
      {
        title: "Practice: Read the Dataset",
        paragraphs: [
          "For every problem, first define one sample, X, and y in plain words.",
        ],
        problems: [
          {
            title: "Examination result dataset",
            prompt:
              "Columns are student_id, study_hours, attendance, previous_score, and pass_or_fail. The goal is to predict whether a student passes.",
            steps: [
              "One row represents one student.",
              "X = study_hours, attendance, previous_score.",
              "y = pass_or_fail.",
              "student_id identifies the row but does not describe academic performance.",
            ],
            answer: "Use three features and remove student_id from the model inputs.",
          },
          {
            title: "Find the matrix shape",
            prompt:
              "A prepared dataset contains 2,400 examples and 12 input features. State the shape of X and the number of target values.",
            steps: [
              "n = 2,400 samples.",
              "p = 12 features.",
              "X therefore has n rows and p columns.",
            ],
            answer: "X has shape 2,400 × 12, and y contains 2,400 values.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to inspect a new dataset",
      steps: [
        "Write what one row represents.",
        "Write the exact target the model must predict.",
        "Keep only inputs that are available at prediction time.",
        "Classify each feature as numerical, categorical, binary, or time-based.",
        "Check missing values, units, impossible values, duplicates, and label quality.",
        "Remove identifiers from X unless their meaning genuinely supports prediction.",
        "Check whether the examples represent the real population.",
      ],
    },
    example: {
      title: "Predicting employee attrition",
      body: "One row represents one employee at the prediction date. Features may include role, tenure, workload, and recent attendance. The target is whether the employee leaves during the defined future period. An exit-interview date cannot be a feature because it is known only after the outcome.",
    },
    misconception:
      "A column is not a valid feature merely because it exists in the table. It must be meaningful and available when the real prediction is made.",
  },
  revise: {
    definitionLabel: "Dataset Anatomy",
    compactDefinition: true,
    definition:
      "Rows are samples, feature columns form X, and the target values form y.",
    sections: [
      {
        title: "Notation",
        formulas: [
          { label: "Encoded inputs", expression: "X ∈ ℝⁿˣᵖ", note: "A numerical matrix with n samples and p features" },
          { label: "One labelled example", expression: "(xᵢ, yᵢ)" },
        ],
      },
      {
        title: "Feature Checks",
        points: [
          "Is it available at prediction time?",
          "Is its meaning and unit consistent?",
          "Is it numerical, categorical, binary, or time-based?",
          "Is it only an identifier?",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Sample = one example or row.",
      "Feature = model input.",
      "Target or label = answer to predict.",
      "X contains features; y contains targets.",
      "Every X row must match the target at the same row in y.",
      "Only use information available at prediction time.",
    ],
    followUp: "Why can an identifier harm a model even though it is numerical?",
  },
  lastMinute: {
    definition: "X contains input features; y contains the target.",
    sections: [
      {
        title: "Read a Table",
        points: ["Row = sample", "Input column = feature", "Answer column = target", "n rows and p features → X is n × p"],
      },
      {
        title: "Before Using a Feature",
        points: ["Meaningful?", "Available in time?", "Correct type?", "Not just an ID?"],
      },
    ],
    memoryLine: "One row, one example; X goes in, y is learned.",
    cues: [
      "Numerical storage does not guarantee numerical meaning.",
      "Labels must align with their rows.",
      "Future information is invalid input.",
    ],
    trap: "Do not feed row IDs directly into a model without a valid reason.",
  },
};

export const dataPreparation: SubjectTopic = {
  slug: "data-preparation",
  title: "Data Preparation",
  description:
    "Clean missing values, encode categories, and scale numerical features without leaking information.",
  readTime: "15 min",
  difficulty: "Foundation",
  tags: ["Preprocessing", "Encoding", "Scaling"],
  learn: {
    opening:
      "Real data is rarely ready for a model. Preparation turns inconsistent values into a clear numerical representation while preserving the meaning of the original examples.",
    sections: [
      {
        title: "Inspect Before Transforming",
        paragraphs: [
          "Begin by understanding the columns. Check data types, units, ranges, missing values, duplicated rows, and impossible values. A transformation cannot correct a column whose meaning is unknown.",
          "Preparation decisions must match the problem. A missing value may mean unknown, not measured, not applicable, or zero. Those meanings require different treatment.",
        ],
        visual: {
          src: "/notes/machine-learning/preprocessing-pipeline.png",
          alt: "Data-preparation flow from inspection through cleaning, encoding, scaling, and model-ready data",
          width: 1536,
          height: 1024,
          caption:
            "Learn preparation values from the training split, then reuse them unchanged on validation, test, and future data.",
        },
      },
      {
        title: "Handle Missing Values",
        paragraphs: [
          "Most algorithms cannot directly use an empty numerical or categorical cell. We can remove affected rows or columns when the loss is small and justified, or replace missing values using an imputation rule.",
          "For a numerical feature, the median is often safer than the mean when extreme values exist. For a categorical feature, a frequent category or a separate Unknown category can be used when that meaning is valid.",
        ],
        dataTable: {
          headers: ["Situation", "Possible treatment", "Important caution"],
          rows: [
            ["Few incomplete rows", "Remove those rows", "Check that removal is not biased"],
            ["Numerical values missing", "Median or mean imputation", "Learn the value from training data only"],
            ["Category missing", "Mode or Unknown category", "Unknown must have a clear meaning"],
            ["Column mostly empty", "Consider removing the column", "Do not discard an important signal blindly"],
          ],
        },
      },
      {
        title: "Encode Categorical Features",
        paragraphs: [
          "Models work with numerical representations. Encoding converts categories into numbers without inventing a false meaning.",
          "Use one-hot encoding for unordered, nominal categories. It creates one indicator column per category. Use ordinal encoding only when the categories have a genuine order.",
          "The fitted encoder must also know what to do when validation, test, or future data contains a category that was not present in training. A safe pipeline may ignore that unseen category in one-hot output or map it to a defined Unknown category instead of failing.",
        ],
        dataTable: {
          headers: ["Original feature", "Suitable encoding", "Reason"],
          rows: [
            ["City: Delhi, Mumbai, Pune", "One-hot encoding", "Cities have no natural rank"],
            ["Size: small, medium, large", "Ordinal encoding", "The categories have an order"],
            ["Subscribed: yes, no", "Binary 1 and 0", "There are two states"],
          ],
        },
      },
      {
        title: "Why Feature Scaling Matters",
        paragraphs: [
          "Features can use very different units. Annual income may be measured in lakhs while age is measured in years. Distance-based algorithms and gradient-based optimization can be dominated by the feature with the larger numerical scale.",
          "Scaling changes numerical representation, not the underlying order of examples. It is especially important for KNN, SVM, and models trained with gradient descent. A decision tree usually does not require scaling because it compares one feature with a threshold at a time.",
        ],
      },
      {
        title: "Min-Max Normalization",
        paragraphs: [
          "Here, normalization means min-max scaling. It maps values to a chosen range, commonly 0 to 1. The smallest training value becomes 0 and the largest becomes 1.",
          "If xₘₐₓ equals xₘᵢₙ, the feature is constant and the denominator is zero. The feature contains no variation, so the pipeline must handle or remove it instead of applying the formula directly.",
        ],
        formulas: [
          {
            label: "Min-max normalization",
            expression: "x′ = (x − xₘᵢₙ) / (xₘₐₓ − xₘᵢₙ)",
            note: "Use xₘᵢₙ and xₘₐₓ calculated from the training split.",
          },
        ],
        problems: [
          {
            title: "Normalize one value",
            prompt:
              "A training feature has minimum 20 and maximum 100. Normalize x = 60 to the range 0 to 1.",
            steps: [
              "x′ = (x − xₘᵢₙ) / (xₘₐₓ − xₘᵢₙ)",
              "x′ = (60 − 20) / (100 − 20)",
              "x′ = 40 / 80",
            ],
            answer: "x′ = 0.5",
          },
        ],
      },
      {
        title: "Standardization",
        paragraphs: [
          "Standardization expresses a value by how many standard deviations it lies above or below the training mean. The transformed training feature has mean near 0 and standard deviation near 1.",
          "If σ = 0, every training value in that feature is the same. Standardization is undefined because division by zero is impossible. Handle or remove the constant feature.",
        ],
        formulas: [
          {
            label: "Z-score standardization",
            expression: "z = (x − μ) / σ",
            note: "μ is the training mean and σ is the training standard deviation.",
          },
        ],
        problems: [
          {
            title: "Find a standardized value",
            prompt:
              "The training mean is μ = 50 and the training standard deviation is σ = 10. Standardize x = 65.",
            steps: [
              "z = (x − μ) / σ",
              "z = (65 − 50) / 10",
              "z = 15 / 10",
            ],
            answer: "z = 1.5, so the value is 1.5 standard deviations above the mean.",
          },
        ],
      },
      {
        title: "Outliers Need Investigation",
        paragraphs: [
          "An outlier is a value far from most other observations. It can be a recording error, a rare valid case, or an important event. Do not remove it merely because it looks unusual.",
          "Correct impossible values when the true value is known, remove verified data errors with a documented rule, and keep valid rare cases when the model must handle them. Robust methods or transformations may reduce their influence.",
        ],
      },
      {
        title: "Fit on Training Data, Transform Every Split",
        paragraphs: [
          "The preprocessing pipeline learns values such as the median, category list, mean, standard deviation, minimum, and maximum. These values are part of the fitted system.",
          "Calculate them using training data only. Then apply those same values to validation and test data. If test data helps calculate them, information from the final evaluation has leaked into training.",
          "During K-fold cross-validation, repeat this rule inside every fold: fit preprocessing on that run's training folds, then transform its validation fold. Fitting preprocessing once on all folds before cross-validation causes leakage.",
          "Save the fitted preprocessing steps with the model so that future inputs receive exactly the same transformations.",
        ],
        flow: [
          "Split the original data",
          "Fit preprocessing on training data",
          "Transform training data",
          "Reuse the fitted preprocessing on validation and test data",
        ],
      },
      {
        title: "Practice: Choose the Correct Preparation",
        paragraphs: [
          "Preparation is a reasoning step. Choose an operation only when the feature and algorithm require it.",
        ],
        problems: [
          {
            title: "Encode an unordered feature",
            prompt:
              "A payment_method column contains Cash, Card, and UPI. Should it be encoded as Cash = 1, Card = 2, UPI = 3?",
            steps: [
              "The categories have no natural order.",
              "The values 1, 2, and 3 would suggest an artificial ranking and distance.",
              "Separate indicator columns preserve the unordered meaning.",
            ],
            answer: "Use one-hot encoding, not ordinal numbers.",
          },
          {
            title: "Handle an unseen category",
            prompt:
              "A city encoder was fitted on Delhi, Mumbai, and Pune. A future row contains Jaipur, which was not present during training.",
            steps: [
              "Jaipur is an unseen category for the fitted encoder.",
              "The pipeline must follow a rule chosen during training.",
              "It can safely ignore the unknown one-hot category or map it to a defined Unknown category.",
            ],
            answer: "Use the fitted encoder's predefined unknown-category rule; do not refit it on the single future row.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to prepare tabular data safely",
      steps: [
        "Inspect column meanings, types, ranges, units, and missing values.",
        "Separate training, validation, and test data before learning preparation values.",
        "Fit missing-value rules using the training data.",
        "Fit category encoders using the training data.",
        "Fit a scaler when the chosen algorithm is sensitive to feature scale.",
        "Apply the fitted pipeline unchanged to validation, test, and future inputs.",
        "Check that the transformed columns have the expected shape and contain no invalid values.",
      ],
    },
    example: {
      title: "Preparing loan-application data",
      body: "Use the training median for missing income, one-hot encode an unordered city column, ordinally encode an ordered risk grade only if that order is real, and standardize numerical features for an SVM. Save the fitted preparation steps with the model so every new application is transformed in exactly the same way.",
    },
    misconception:
      "Preprocessing is not a harmless step performed on the whole dataset. Any value learned from data must be learned from the training split only.",
  },
  revise: {
    definitionLabel: "Purpose",
    compactDefinition: true,
    definition:
      "Data preparation cleans values and creates the numerical representation that the model will receive.",
    sections: [
      {
        title: "Essential Formulas",
        formulas: [
          { label: "Min-max", expression: "x′ = (x − xₘᵢₙ) / (xₘₐₓ − xₘᵢₙ)" },
          { label: "Standardization", expression: "z = (x − μ) / σ" },
        ],
      },
      {
        title: "Encoding Choice",
        table: {
          headers: ["Nominal category", "Ordinal category"],
          rows: [
            ["No natural order", "Real order exists"],
            ["Usually one-hot encode", "May use ordered values"],
          ],
        },
      },
      {
        title: "Safe Order",
        flow: ["Split", "Fit preparation on training", "Transform training", "Reuse on validation and test"],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Understand why a value is missing before replacing it.",
      "One-hot encoding is for unordered categories.",
      "Ordinal encoding is only for genuinely ordered categories.",
      "Define how the encoder handles a category that was unseen during training.",
      "Scaling is important for distance and gradient-based methods.",
      "Constant features make min-max and z-score denominators zero.",
      "Valid outliers should not be deleted automatically.",
      "Fit preprocessing on training data only, including inside every cross-validation fold.",
    ],
    followUp: "Why must a scaler be fitted after the data split?",
  },
  lastMinute: {
    definition: "Prepare data consistently without allowing validation or test information into training.",
    sections: [
      {
        title: "Order",
        flow: ["Inspect", "Split", "Fit cleaner and encoder", "Fit scaler", "Transform all splits"],
      },
      {
        title: "Two Formulas",
        points: ["Min-max: (x − min) / (max − min)", "Z-score: (x − μ) / σ", "If the denominator is 0, handle the constant feature"],
      },
    ],
    memoryLine: "Fit on training; only transform validation and test.",
    cues: [
      "Nominal → one-hot.",
      "Ordinal → preserve real order.",
      "Investigate outliers before changing them.",
    ],
    trap: "Never calculate the scaler or imputation value from the complete dataset before splitting.",
  },
};

export const trainValidationAndTestData: SubjectTopic = {
  slug: "training-validation-and-test-data",
  title: "Training, Validation, and Test Data",
  description:
    "Give each data split one clear job and use cross-validation without contaminating the final test set.",
  readTime: "16 min",
  difficulty: "Foundation",
  tags: ["Data Split", "Cross-Validation", "Evaluation"],
  learn: {
    opening:
      "A model must be judged on examples it did not learn from. Training, validation, and test sets create this separation.",
    sections: [
      {
        title: "Why Training Accuracy Is Not Enough",
        paragraphs: [
          "A model can remember details from its training examples and still fail on new data. Measuring it on the same examples used for learning gives an overly optimistic result.",
          "We therefore separate model fitting, model selection, and final evaluation.",
        ],
      },
      {
        title: "Three Sets, Three Jobs",
        paragraphs: [
          "The training set teaches model parameters. The validation set helps choose algorithms, features, and hyperparameters. The test set estimates final performance after all choices are complete.",
        ],
        dataTable: {
          headers: ["Set", "Used for", "Must not be used for"],
          rows: [
            ["Training", "Learning model and preprocessing parameters", "Final performance claim"],
            ["Validation", "Comparing choices and tuning hyperparameters", "Updating model parameters directly"],
            ["Test", "One final unbiased evaluation", "Repeated model selection"],
          ],
        },
      },
      {
        title: "Two Valid Evaluation Setups",
        paragraphs: [
          "A holdout setup creates separate training, validation, and test sets. A cross-validation setup first reserves the final test set, then performs K-fold cross-validation only inside the remaining development data.",
          "Do not mix the two diagrams: a separate fixed validation set is optional when cross-validation is already being used for model selection.",
        ],
        visual: {
          src: "/notes/machine-learning/data-splitting.png",
          alt: "Holdout validation and K-fold cross-validation shown as two separate evaluation setups",
          width: 1536,
          height: 1024,
          caption:
            "Choose one model-selection setup. In both cases, the final test set remains untouched.",
        },
        table: {
          headers: ["Holdout setup", "Cross-validation setup"],
          rows: [
            ["Training + Validation + Test", "Development data with K-fold CV + Test"],
            ["One fixed validation set", "Validation fold rotates K times"],
            ["Faster and simple", "Uses limited development data more fully"],
          ],
        },
      },
      {
        title: "Split Ratios Are Guidelines",
        paragraphs: [
          "There is no universal split ratio. A holdout setup may start with 70% training, 15% validation, and 15% test. A cross-validation setup may reserve 20% for final testing and use K-fold CV inside the remaining 80% development data.",
          "With a very large dataset, a small percentage can still provide thousands of validation and test examples. The important requirement is enough representative data in every set.",
        ],
        formulas: [
          {
            label: "Split count",
            expression: "set size = total samples × set proportion",
          },
        ],
        problems: [
          {
            title: "Calculate a 70-15-15 split",
            prompt:
              "A dataset contains 12,000 examples. Find the number of training, validation, and test examples.",
            steps: [
              "Training = 12,000 × 0.70 = 8,400",
              "Validation = 12,000 × 0.15 = 1,800",
              "Test = 12,000 × 0.15 = 1,800",
              "Check: 8,400 + 1,800 + 1,800 = 12,000",
            ],
            answer: "Training 8,400; validation 1,800; test 1,800.",
          },
        ],
      },
      {
        title: "Random and Stratified Splits",
        paragraphs: [
          "A random split prevents the original row order from deciding which examples enter each set. For classification, a stratified split also preserves approximately the same class proportions in every set.",
          "Stratification is especially important when one class is rare. A purely random small test set might contain too few rare examples for a reliable evaluation.",
        ],
        problems: [
          {
            title: "Stratify a small classification dataset",
            prompt:
              "A dataset has 1,000 examples: 900 negative and 100 positive. An 80-20 stratified split is required.",
            steps: [
              "Training negatives = 900 × 0.80 = 720",
              "Training positives = 100 × 0.80 = 80",
              "Test negatives = 900 − 720 = 180",
              "Test positives = 100 − 80 = 20",
            ],
            answer: "Training: 720 negative and 80 positive. Test: 180 negative and 20 positive.",
          },
        ],
      },
      {
        title: "K-Fold Cross-Validation",
        paragraphs: [
          "K-fold cross-validation divides the development data into K similar folds. It trains K times. Each run uses one fold for validation and the other K − 1 folds for training. The validation scores are then averaged.",
          "Every run must fit its imputer, encoder, scaler, feature selection, and model on that run's training folds only. It then transforms and scores the validation fold. Preprocessing all folds before cross-validation leaks information.",
          "Cross-validation uses limited data efficiently and shows whether performance changes across subsets. Report the mean score together with the individual scores or their variation; the mean alone can hide an unstable model.",
        ],
        formulas: [
          {
            label: "Mean cross-validation score",
            expression: "CV mean = (s₁ + s₂ + … + sₖ) / K",
            note: "sᵢ is the validation score from fold i.",
          },
        ],
        problems: [
          {
            title: "Average five validation scores",
            prompt:
              "Five folds produce accuracy scores 0.82, 0.85, 0.80, 0.84, and 0.79. Find the mean.",
            steps: [
              "Sum = 0.82 + 0.85 + 0.80 + 0.84 + 0.79 = 4.10",
              "CV mean = 4.10 / 5",
            ],
            answer: "Mean cross-validation accuracy = 0.82 or 82%.",
          },
        ],
      },
      {
        title: "Groups Must Stay Together",
        paragraphs: [
          "Related rows must not be divided in a way that makes evaluation artificially easy. If one patient has several medical records, records from that patient should not appear in both training and test sets. The model could recognize patient-specific patterns instead of learning a general medical relationship.",
          "The same rule applies to repeated measurements, multiple images of the same object, and records from the same user or device. Split by the real independent group.",
        ],
      },
      {
        title: "Time-Ordered Data Is Different",
        paragraphs: [
          "For time-series prediction, future observations must not train a model that is evaluated on the past. Keep chronological order: train on earlier data, validate on later data, and test on the latest period.",
          "Random shuffling can create a future-to-past leak and produce an unrealistic score.",
        ],
        flow: ["Earlier observations: train", "Later observations: validate", "Latest untouched observations: test"],
      },
      {
        title: "The Test Set Is Not a Second Validation Set",
        paragraphs: [
          "If we repeatedly check test performance and change the model, our decisions begin to fit that test set. It is no longer an unbiased final check.",
          "Complete model choices using training and validation data. Use the test set once for the final report. If major changes follow, a fresh test set is needed for a new unbiased estimate.",
        ],
      },
    ],
    mechanism: {
      title: "How to create a reliable evaluation split",
      steps: [
        "Identify the real independent unit, such as a customer, patient, or time period.",
        "Reserve a representative test set before exploring model choices.",
        "Choose either a fixed validation set or cross-validation inside the remaining development data.",
        "Use stratification for classification when class proportions matter.",
        "Keep related groups together and preserve time order when required.",
        "Fit preprocessing and the model using training data only; repeat this inside every cross-validation run.",
        "Use validation results to choose the system, then evaluate once on test data.",
      ],
    },
    example: {
      title: "Testing a student-performance model",
      body: "If multiple rows belong to the same student, split by student rather than by row. Otherwise the model may see one student's earlier record during training and that same student's later record during testing, making the result look better than performance on a truly new student.",
    },
    misconception:
      "The test set is not data that the model can repeatedly consult. Repeated test-driven changes turn the test set into validation data.",
  },
  revise: {
    definitionLabel: "Purpose",
    compactDefinition: true,
    definition:
      "Training learns, validation chooses, and testing gives the final estimate on unseen data.",
    sections: [
      {
        title: "Roles",
        dataTable: {
          headers: ["Set", "Job"],
          rows: [
            ["Training", "Fit preprocessing and model parameters"],
            ["Validation", "Choose features, model, and hyperparameters"],
            ["Test", "Report final performance"],
          ],
        },
      },
      {
        title: "K-Fold Rule",
        points: [
          "Reserve the external test set first.",
          "Create K folds inside the remaining development data.",
          "Validate on a different fold in every run.",
          "Refit preprocessing and the model in every run.",
          "Report the K scores and their average.",
          "Keep the external test set untouched.",
        ],
      },
      {
        title: "Special Splits",
        points: [
          "Classification: consider stratification.",
          "Repeated entities: split by group.",
          "Time series: preserve chronological order.",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Never judge a model only on its training data.",
      "There is no single correct split percentage.",
      "Stratification preserves class proportions.",
      "Use either a fixed holdout validation set or K-fold cross-validation for model selection.",
      "Cross-validation refits preprocessing and the model in every fold.",
      "Related examples must stay in the same split.",
      "Use the final test set only after choices are complete.",
    ],
    followUp: "What happens if we tune hyperparameters using the test score?",
  },
  lastMinute: {
    definition: "Separate learning, choosing, and final testing.",
    sections: [
      {
        title: "Three Jobs",
        points: ["Train: learn", "Validation: choose", "Test: final report"],
      },
      {
        title: "Split Rules",
        points: ["Choose holdout or K-fold CV", "Stratify classes", "Keep groups together", "Keep time in order", "Refit preprocessing in each fold"],
      },
    ],
    memoryLine: "Train many times, validate choices, test once.",
    cues: [
      "K-fold validation does not consume the final test set.",
      "Ratios depend on dataset size and problem needs.",
      "Repeated test checks create optimistic results.",
    ],
    trap: "Do not shuffle future time-series observations into the training set.",
  },
};

export const modelGeneralization: SubjectTopic = {
  slug: "model-generalization",
  title: "Model Generalization",
  description:
    "Understand underfitting, overfitting, bias and variance, regularization, and the main forms of data leakage.",
  readTime: "18 min",
  difficulty: "Foundation",
  tags: ["Overfitting", "Bias-Variance", "Leakage"],
  learn: {
    opening:
      "The goal is not to remember the training data. The goal is to learn a stable pattern that continues to work on new examples.",
    sections: [
      {
        title: "What Generalization Means",
        paragraphs: [
          "Generalization is a model's ability to perform well on unseen data drawn from the same real problem. A useful model captures repeatable relationships rather than accidental details of its training set.",
          "We estimate generalization using validation and test data that did not fit the model parameters.",
        ],
        visual: {
          src: "/notes/machine-learning/generalization.png",
          alt: "Comparison of an underfitted model, a good fit, and an overfitted model",
          width: 1536,
          height: 1024,
          caption:
            "A good fit captures the stable direction of the data without chasing every small training fluctuation.",
        },
      },
      {
        title: "Underfitting",
        paragraphs: [
          "Underfitting happens when the model is too simple, the features are insufficient, or training has not captured the important relationship. It performs poorly even on the training data.",
        ],
        points: [
          "Training error is high.",
          "Validation error is also high.",
          "The model misses a real pattern shared by many examples.",
          "This behaviour is associated with high bias.",
        ],
      },
      {
        title: "Overfitting",
        paragraphs: [
          "Overfitting happens when a model learns training-specific noise or rare details that do not repeat in new data. Training performance becomes excellent while validation performance remains much worse.",
        ],
        points: [
          "Training error is very low.",
          "Validation error is noticeably higher.",
          "The gap often grows as model complexity increases.",
          "This behaviour is associated with high variance.",
        ],
      },
      {
        title: "Bias and Variance",
        paragraphs: [
          "Bias is error caused by assumptions that are too simple to represent the important pattern. Variance is sensitivity to the particular examples used for training.",
          "A high-bias model gives similarly poor results across different training samples. A high-variance model changes greatly when the training sample changes.",
          "Some error is irreducible noise: randomness or missing information that no model can fully predict. The relationship below is a conceptual guide; its formal derivation is not needed in this foundation module.",
        ],
        dataTable: {
          headers: ["High bias", "High variance"],
          rows: [
            ["Model is too restricted", "Model is too sensitive"],
            ["Often underfits", "Often overfits"],
            ["Training and validation errors are both high", "Training error is low but validation error is higher"],
            ["May need better features or a more flexible model", "May need more data, regularization, or a simpler model"],
          ],
        },
        formulas: [
          {
            label: "Conceptual error decomposition",
            expression: "expected error = bias² + variance + irreducible noise",
            note: "A useful model balances bias and variance; some noise cannot be removed.",
          },
        ],
      },
      {
        title: "Learning Curves",
        paragraphs: [
          "A learning curve plots model performance against training-set size or training progress. It helps distinguish a model that lacks capacity from a model that needs more representative data.",
          "If training and validation errors are both high and close together, high bias is likely. If training error is low but validation error is much higher, high variance is likely. A small gap is good only when both errors are also acceptably low.",
        ],
        visual: {
          src: "/notes/machine-learning/learning-curves.png",
          alt: "Learning curves comparing high bias, good generalization, and high variance using training and validation error",
          width: 1536,
          height: 1024,
          caption:
            "Read both the error level and the gap. A small gap with high errors still means underfitting.",
        },
      },
      {
        title: "Ways to Control Overfitting",
        paragraphs: [
          "The correct response depends on the cause. Do not reduce model complexity blindly if the data itself is unrepresentative or leaking information.",
        ],
        points: [
          "Collect more representative training examples.",
          "Remove invalid or noisy features after investigation.",
          "Use cross-validation to compare model settings.",
          "Reduce unnecessary model complexity.",
          "Use regularization to discourage overly complex parameter values.",
          "Stop iterative training when validation performance begins to worsen.",
        ],
      },
      {
        title: "Regularization: The Essential Idea",
        paragraphs: [
          "Regularization adds a preference for a simpler model during training. It discourages parameter values that fit small training fluctuations too aggressively.",
          "The regularization strength is a hyperparameter chosen using validation data. Too little may allow overfitting; too much may cause underfitting. Ridge and Lasso will be taught with linear regression.",
        ],
        formulas: [
          {
            label: "Regularized objective",
            expression: "total objective = data loss + λ × complexity penalty",
            note: "λ controls how strongly complexity is penalized.",
          },
        ],
      },
      {
        title: "Data Leakage",
        paragraphs: [
          "Data leakage occurs when training receives information that would not be available for a real future prediction, or when validation or test information influences the fitted system.",
          "Leakage can produce excellent evaluation scores while the deployed model performs poorly. It is a problem in the experimental design, not an achievement by the algorithm.",
        ],
        dataTable: {
          headers: ["Leakage source", "Example", "Correct approach"],
          rows: [
            ["Target leakage", "Using a field created after the outcome", "Use only information available at prediction time"],
            ["Preprocessing leakage", "Scaling before splitting", "Split first and fit preprocessing on training data"],
            ["Group leakage", "Same patient in train and test", "Split by patient"],
            ["Time leakage", "Future records used to predict the past", "Preserve chronological order"],
            ["Test-set leakage", "Choosing the model with repeated test scores", "Choose with validation data"],
          ],
        },
      },
      {
        title: "Distribution Shift",
        paragraphs: [
          "An honest test score describes data similar to the test set. Real performance can fall when future inputs come from a different population, time period, device, policy, or user behaviour. This change is called distribution shift.",
          "After deployment, monitor input patterns and prediction quality. If the real data changes meaningfully, collect representative examples and evaluate the system again instead of assuming the old score still applies.",
        ],
        points: [
          "A fraud pattern changes after criminals adopt a new method.",
          "A demand model trained in normal months faces a major festival.",
          "A medical model is used at a hospital with a different patient population.",
        ],
      },
      {
        title: "Practice: Diagnose the Model",
        paragraphs: [
          "Use training and validation behaviour together. One score alone is not enough to diagnose the problem.",
        ],
        problems: [
          {
            title: "High bias or high variance?",
            prompt:
              "Model A has 62% training accuracy and 60% validation accuracy. Model B has 99% training accuracy and 74% validation accuracy.",
            steps: [
              "Model A performs poorly on both sets, and the gap is small.",
              "That pattern suggests underfitting and high bias.",
              "Model B has a large training-validation gap.",
              "That pattern suggests overfitting and high variance.",
            ],
            answer: "Model A: high bias. Model B: high variance.",
          },
          {
            title: "Find target leakage",
            prompt:
              "A model predicts whether a customer will cancel a subscription. One feature is account_closed_date.",
            steps: [
              "The close date is normally created after cancellation is known.",
              "It will not exist when predicting an active customer's future cancellation.",
              "The feature directly reveals the target outcome.",
            ],
            answer: "Remove account_closed_date; it is target leakage.",
          },
          {
            title: "Interpret regularization strength",
            prompt:
              "What can happen when λ in the regularized objective becomes extremely large?",
            steps: [
              "A large λ gives the complexity penalty very high importance.",
              "The model is strongly restricted from fitting the data.",
              "Important relationships may also be suppressed.",
            ],
            answer: "The model can become too simple and underfit.",
          },
        ],
      },
    ],
    mechanism: {
      title: "How to diagnose generalization problems",
      steps: [
        "Confirm that the split represents future use and contains no leakage.",
        "Compare training and validation performance using the same metric.",
        "If both are poor, investigate high bias, weak features, or insufficient training.",
        "If training is strong but validation is much worse, investigate high variance.",
        "Use learning curves and cross-validation to confirm the pattern.",
        "Apply a targeted change such as better data, suitable complexity, or regularization.",
        "Recheck validation performance without consulting the final test set.",
      ],
    },
    example: {
      title: "A suspiciously perfect medical model",
      body: "A model scores almost 100% because a discharge-code feature indirectly contains the final diagnosis. That code is unavailable when the early prediction is needed. Removing it may lower the validation score, but the new result is honest and useful.",
    },
    misconception:
      "A higher validation score is not always better evidence. If the data split or features leak the answer, the score does not measure real generalization.",
  },
  revise: {
    definitionLabel: "Main Goal",
    compactDefinition: true,
    definition:
      "Generalization means learning a stable pattern that works on new examples, not memorizing training-specific details.",
    sections: [
      {
        title: "Diagnosis",
        dataTable: {
          headers: ["Observed behaviour", "Likely problem"],
          rows: [
            ["Training and validation errors high with a small gap", "Underfitting / high bias"],
            ["Training strong, validation much poorer", "Overfitting / high variance"],
            ["Training and validation errors low with a small gap", "Good generalization"],
            ["Unrealistically strong score", "Check leakage before celebrating"],
          ],
        },
      },
      {
        title: "Regularization",
        formulas: [
          { label: "Objective", expression: "data loss + λ × complexity penalty" },
          { label: "Error view", expression: "bias² + variance + irreducible noise" },
        ],
      },
      {
        title: "Leakage Checks",
        points: [
          "Was the feature available at prediction time?",
          "Was preprocessing fitted on training data only?",
          "Are related entities kept in one split?",
          "Is future data excluded from past predictions?",
          "Did model selection avoid the test set?",
        ],
      },
    ],
    essentialsStyle: "plain",
    essentials: [
      "Underfitting is associated with high bias.",
      "Overfitting is associated with high variance.",
      "A large training-validation gap suggests overfitting.",
      "A small gap is useful only when both errors are low.",
      "Regularization trades some training fit for simpler behaviour.",
      "Leakage makes evaluation optimistic and deployment disappointing.",
      "Distribution shift can make an old test score unreliable for current data.",
      "Diagnose the data and split before changing the algorithm.",
    ],
    followUp: "How can a model have an excellent test score and still be unusable?",
  },
  lastMinute: {
    definition: "A good model works on unseen data.",
    sections: [
      {
        title: "Fit Check",
        points: ["Both errors high → underfit / high bias", "Large train-validation gap → overfit / high variance", "Both errors low with a small gap → good fit"],
      },
      {
        title: "Leakage Check",
        points: ["No future answer in features", "Fit preprocessing on train", "Keep groups together", "Do not tune on test"],
      },
    ],
    memoryLine: "Learn the signal, ignore the noise, protect the test boundary.",
    cues: [
      "Regularization adds a complexity penalty.",
      "More complexity is not always better.",
      "Perfect performance can be a leakage warning.",
      "Monitor for distribution shift after deployment.",
    ],
    trap: "Never diagnose a model from training performance alone.",
  },
};
