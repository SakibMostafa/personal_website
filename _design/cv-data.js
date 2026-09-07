// Shared CV content for Sakib Mostafa's portfolio
window.CV = {
  name: "Sakib Mostafa",
  role: "Postdoctoral Scholar",
  affiliation: "Department of Radiation Oncology, Stanford School of Medicine",
  location: "Stanford, CA",
  email: "sakib.mostafa@stanford.edu",
  scholar: "Google Scholar",
  linkedin: "LinkedIn",
  tagline: "Building interpretable AI for cancer detection, liquid biopsy, and multi-omics integration.",
  shortBio: "I develop deep learning frameworks that translate biological signals — cfRNA, multi-omics, networks — into images so vision foundation models can see them. My current work spans liquid biopsy for early cancer detection, multimodal AI for imaging-genomics integration, and graph foundation models for biological networks.",

  highlights: [
    { label: "Manuscripts under review", value: "3", note: "Nature Communications · Nature Biomedical Engineering · Nature Computational Science" },
    { label: "Stanford Cancer Institute Innovation Award", value: "$75K", note: "December 2025" },
    { label: "Peer-reviewed publications", value: "19", note: "+ 1 book chapter · 560+ citations" },
    { label: "Patents filed (Stanford OTL)", value: "2", note: "Graph foundation models · Tabular-to-image" },
    { label: "Research grants secured", value: "$95K", note: "Plus CAD 168.5K in scholarships" },
    { label: "Years teaching & mentoring", value: "6", note: "7 TAships · 11 trainees mentored" },
  ],

  natureSubmissions: [
    {
      title: "Vision-Based Deep Learning of Biomedical Tabular Data via Self-Supervised Cartographic Representation",
      venue: "Nature Communications",
      status: "Under review",
      preprint: "arxiv.org/abs/2603.22675",
    },
    {
      title: "Language-Encoded Structural Topology Enables Generalizable Foundation Models for Graph-Structured Data",
      venue: "Nature Computational Science",
      status: "Under review",
      preprint: "arxiv.org/abs/2604.06391",
    },
    {
      title: "Transformation of Biological Networks into Images via Semantic Cartography for Visual Interpretation and Scalable Deep Analysis",
      venue: "Nature Biomedical Engineering",
      status: "Under review",
      preprint: "arxiv.org/abs/2512.07040",
    },
    {
      title: "Knowledge Graph Modulated Deep Learning for Limited-Sample Clinical Data Analysis",
      venue: "Nature Biomedical Engineering",
      status: "Preparing for submission",
      preprint: "arxiv.org/abs/2605.24162",
    },
    {
      title: "A Vision Foundation Model for Single-Cell Biology via Spatial Gene Cartography",
      venue: "Nature",
      status: "Preparing for submission",
      preprint: "arxiv.org/abs/2607.14163",
    },
  ],

  researchAreas: [
    { title: "Liquid Biopsy & cfRNA", body: "Interpretable models for cancer detection, subtype prediction, and staging across RARE-Seq and independent cfRNA cohorts. Reduced gene panels and biologically grounded attribution maps for clinical adoption." },
    { title: "Multimodal Cancer AI", body: "Architectures that integrate molecular omics with medical imaging to surface genetic programs linked to imaging phenotypes." },
    { title: "Graph Foundation Models", body: "Graph-to-image and language-encoded topology frameworks that train vision foundation models on biological networks — outperforming GNNs across benchmarks." },
    { title: "Explainable AI", body: "XAI techniques for model selection and decision interpretability, spanning plant phenotyping, cancer, and software analytics." },
  ],

  positions: [
    {
      role: "Postdoctoral Scholar",
      where: "Stanford School of Medicine — Department of Radiation Oncology",
      dates: "April 2025 — Present",
      advisor: "Md. Tauhidul Islam",
      bullets: [
        "Developed Dynomap — an interpretable spatial-representation framework converting high-dimensional cfRNA and biomedical tabular profiles into image-like representations.",
        "Led liquid biopsy analyses across cfRNA cohorts including RARE-Seq, with focus on early detection, reduced panels, and biologically interpretable attribution.",
        "Designed multimodal architectures integrating molecular profiles with medical imaging to identify genetic programs linked to imaging phenotypes.",
        "Built graph-to-image and graph foundation model frameworks for heterogeneous, multi-omics, and cancer biology data.",
      ],
    },
    {
      role: "Postdoctoral Associate",
      where: "National Research Council Canada & University of Calgary",
      dates: "January 2024 — February 2025",
      advisor: "Sateesh Kagale (NRC) · Marcus Samuel (Calgary)",
      bullets: [
        "Contributed to a consortium-led pangenome project on de novo assembly of 65+ pea genomes.",
        "Led genomic analysis of 4,800 skim-sequenced lines: assembly, SNP calling, genotype imputation.",
        "Benchmarked DeepVariant against conventional SNP callers for the pea genome.",
        "Built deep-learning imputation models tailored to plant genomics.",
      ],
    },
    {
      role: "Software Developer",
      where: "Global Institute for Food Security",
      dates: "January 2023 — September 2023",
      advisor: "Steven Xu",
      bullets: ["Maintained and optimized a cross-team genomic database, reducing downtime by 98%."],
    },
    {
      role: "Software Developer",
      where: "Nutrien Ag Solutions",
      dates: "January 2022 — December 2022",
      advisor: "Zoe Ehlert",
      bullets: ["Engineered genomic data management solutions, dropping marker-assisted breeding error rates to 1%."],
    },
    {
      role: "Mitacs Research Intern",
      where: "Nutrien Ag Solutions",
      dates: "August 2021 — December 2021",
      advisor: "Ian Stavness · Zoe Ehlert",
      bullets: ["Designed a Django web platform for storing and analyzing genomic data across interdisciplinary teams."],
    },
  ],

  education: [
    { degree: "PhD, Computer Science", year: "May 2024", school: "University of Saskatchewan", advisor: "Debajyoti Mondal", thesis: "Improving Deep Learning Classifiers for Plant Phenotyping using XAI Techniques" },
    { degree: "MSc, Biomedical Engineering", year: "August 2019", school: "University of Saskatchewan", advisor: "Fang-Xiang Wu", thesis: "Machine Learning for the Diagnosis of Autism Spectrum Disorder" },
    { degree: "BSc, Electronics & Communication Engineering", year: "May 2016", school: "Khulna University of Engineering and Technology, Bangladesh", advisor: "A. B. M. Aowlad Hossain", thesis: "Simulation Study on Nonlinear Ultrasound Imaging" },
  ],

  publications: {
    "Current Nature-Family Manuscript Status": [
      { authors: "Mostafa S, Jiang Y, Zou J, Massoud TF, Alizadeh AA, Diehn M, Xing L, Islam MT", title: "Vision-Based Deep Learning of Biomedical Tabular Data via Self-Supervised Cartographic Representation.", venue: "Nature Communications", note: "Under review", year: "2026" },
      { authors: "Mostafa S, Zou J, Alizadeh AA, Diehn M, Xing L, Islam MT", title: "Language-Encoded Structural Topology Enables Generalizable Foundation Models for Graph-Structured Data.", venue: "Nature Computational Science", note: "Under review", year: "2026" },
      { authors: "Mostafa S, Diehn M, Alizadeh AA, Xing L, Islam MT", title: "Transformation of Biological Networks into Images via Semantic Cartography for Visual Interpretation and Scalable Deep Analysis.", venue: "Nature Biomedical Engineering", note: "Under review", year: "2026" },
      { authors: "Xue Y, Mostafa S, Zou J, Liao J, Diehn M, Alizadeh AA, Xing L, Islam MT", title: "Knowledge Graph Modulated Deep Learning for Limited-Sample Clinical Data Analysis.", venue: "Nature Biomedical Engineering", note: "Preparing for submission", year: "2026" },
      { authors: "Yesiloglu R, Mostafa S, Zou J, Alizadeh A, Wu J, Xing L, Adeli E, Islam MT", title: "A Vision Foundation Model for Single-Cell Biology via Spatial Gene Cartography.", venue: "Nature", note: "Preparing for submission", year: "2026" },
    ],
    "Cancer and Biomedical AI": [
      { authors: "Rahman A, Rahman A, Mostafa S, Islam MT", title: "Cross-Cancer Computational Framework for Immune-Dysregulated Ecosystem Discovery and Therapeutic Prioritization.", venue: "Proc. IEEE CBMS", year: "2026" },
    ],
    "Neurological Disorder Diagnosis & Medical Imaging": [
      { authors: "Yin W, Mostafa S, Wu F-X", title: "Diagnosis of Autism Spectrum Disorder Based on Functional Brain Networks with Deep Learning.", venue: "Journal of Computational Biology 28(2)", year: "2021", citations: 162 },
      { authors: "Mostafa S, Tang L, Wu F-X", title: "Diagnosis of Autism Spectrum Disorder Based on Eigenvalues of Brain Networks.", venue: "IEEE Access 7", year: "2019", citations: 98, impact: "IF 4.64 · Q1" },
      { authors: "Tang L, Mostafa S, Wu F-X", title: "A Network Clustering-Based Feature Selection Strategy for Classifying Autism Spectrum Disorder.", venue: "BMC Medical Genomics 12:153", year: "2019", citations: 13 },
      { authors: "Jahan F, Shifat SM, Anannya FZ, Mostafa S, Hasan MM", title: "Dementia Patient Health, Prescriptions ML Dataset: LightGBM Classification of XAI-based LIME and SHAP for Dementia Detection.", venue: "Proc. NSysS", year: "2024" },
      { authors: "Mostafa S, Yin W, Wu F-X", title: "Autoencoder-Based Methods for Diagnosis of Autism Spectrum Disorder.", venue: "ICCABS, LNCS 12029", year: "2019", citations: 26 },
      { authors: "Guo H, Yin W, Mostafa S, Wu F-X", title: "Diagnosis of ASD from rs-fMRI Images Based on Brain Dynamic Networks.", venue: "ISBRA, LNCS 12304", year: "2020" },
    ],
    "Plant Phenomics & Agricultural AI": [
      { authors: "Mostafa S, Mondal D, Panjvani K, Kochian L, Stavness I", title: "Explainable Deep Learning in Plant Phenotyping.", venue: "Frontiers in AI: AI in Food, Agriculture, Water 6", year: "2023", citations: 80 },
      { authors: "Mostafa S, Mondal D, Beck M, Bidinosti C, Henry C, Stavness I", title: "Leveraging Guided Backpropagation to Select Convolutional Neural Networks for Plant Classification.", venue: "Frontiers in AI 5", year: "2022", citations: 23, impact: "IF 3.77 · Q2" },
      { authors: "Mostafa S, Mondal D, Beck M, Bidinosti C, Henry C, Stavness I", title: "Visualizing Feature Maps for Model Selection in Convolutional Neural Networks.", venue: "ICCV Workshops", year: "2021", impact: "Acceptance 25%" },
    ],
    "Software Engineering & Methodological CS": [
      { authors: "Mostafa S, Cynthia ST, Roy B, Mondal D", title: "Feature Transformation for Improved Software Bug Detection Models.", venue: "Journal of Systems and Software 219", year: "2025", impact: "IF 3.7 · Q1" },
      { authors: "Mostafa S, Fahim MANI, Hossain ABMA", title: "A New Chaos-Based Medical Image Encryption Scheme.", venue: "ICIEV", year: "2017", citations: 7 },
      { authors: "Fahim MANI, Mostafa S, Tasnim J, Hossain ABMA", title: "Alignment of 3-D Scanning Data for Polygonal Mesh based on Modified Triangulation.", venue: "ICIEV", year: "2017" },
      { authors: "Mostafa S, Fahim MANI, Tasnim J", title: "An Approach to Effective 3D Reconstruction Based on Point Cloud Merging.", venue: "IEEE WIECON-ECE", year: "2016" },
      { authors: "Jahiruzzaman M, Fahim MANI, Mostafa S, Hossain ABMA", title: "An Adaptive Reconfigurable Radix-2n FFT/IFFT Architecture.", venue: "IEEE ICIEV", year: "2016" },
      { authors: "Zahan N, Hossain ABMA, Mostafa S", title: "Simulation Study on Nonlinear Ultrasound Imaging Using Different Realistic Synthetic Phantoms.", venue: "IEEE WIECON-ECE", year: "2015" },
    ],
    "Book Chapter": [
      { authors: "Mostafa S, Wu F-X", title: "Diagnosis of Autism Spectrum Disorder with Convolutional Autoencoder and Structural MRI Images.", venue: "Neural Engineering Techniques for ASD, Academic Press", year: "2021", citations: 59 },
    ],
  },

  inPrep: [
    "Streamlining Multi-Modal Model for Multi-Omics Integration — Optimal Transport across omics channels.",
    "Knowledge Graph Modulated Deep Learning for Limited-Sample Clinical Data Analysis — GraphNode classifier with global pathway context.",
    "A Vision Foundation Model for Biological Networks via Image Transformation of Graph Topology.",
    "Traditional vs Deep Learning: Benchmarking Aligners and SNP Callers for Low-Coverage Sequencing in Pea.",
    "Leveraging Feature Explanation for Model Selection: An XAI Framework.",
    "Genomap Integration Enhances Multi-Omics Visualization and Deep Analysis of Single-Cell Expression Data.",
  ],

  patents: [
    { title: "A Graph Foundation Model for Cross-Domain Node Representation Learning on Heterogeneous Graphs.", inventors: "Islam MT, Xing L, Mostafa S", docket: "Stanford OTL 26-222", date: "Filed May 2026" },
    { title: "An End-to-End Deep Learning System for Transforming Tabular Data into Images for High-Performance Classification.", inventors: "Islam MT, Xing L, Mostafa S", docket: "Stanford OTL 25-519", date: "Filed November 2025" },
  ],

  awards: [
    { name: "Google Cloud Platform Research Grant", amount: "USD 20,000", year: "May 2026 — April 2027", where: "Stanford School of Medicine" },
    { name: "Stanford Cancer Institute Innovation Award", amount: "USD 75,000", year: "December 2025", where: "Stanford School of Medicine" },
    { name: "University of Saskatchewan Departmental Scholarship", amount: "CAD 46,000", year: "2020 — 2024", where: "Computer Science" },
    { name: "Plant Phenotyping & Imaging Research Center Grant", amount: "CAD 46,000", year: "2020 — 2024", where: "Global Institute for Food Security" },
    { name: "Mitacs Business Strategy Internship", amount: "CAD 30,000", year: "2021 & 2022", where: "Mitacs Accelerate" },
    { name: "Devolved Scholarship", amount: "CAD 34,000", year: "2017 — 2019", where: "Biomedical Engineering, USask" },
    { name: "Faculty Scholarship", amount: "CAD 10,000", year: "2012 — 2016", where: "KUET, Bangladesh" },
    { name: "Best Poster Award, Agriculture Research Day", amount: "CAD 1,500", year: "September 2023", where: "USask" },
    { name: "Best Poster Award, First Runner-Up", amount: "CAD 1,000", year: "September 2023", where: "7th Symposium on Innovations in CS" },
    { name: "Best Poster Award", amount: "CAD 700", year: "October 2021", where: "P2IRC Symposium" },
    { name: "GIFS Gracias Award", amount: "—", year: "October 2023", where: "For outstanding Genguard development" },
  ],

  talks: [
    { title: "A Language-Encoded Structural Topology Enables Generalizable Foundation Models for Graph-Structured Data.", venue: "Stanford Cancer Institute Radiation and Cancer Biology Seminar Series", date: "May 2026", kind: "Invited" },
    { title: "Interpretable Integration of Molecular Omics and Medical Imaging for Disease Analysis.", venue: "AAPM Annual Meeting 2026, Vancouver, BC", date: "July 2026", kind: "Oral" },
    { title: "XAI Solutions for Deep Learning Models in Plant Phenotyping.", venue: "Department of Computer Science, University of Saskatchewan", date: "April 2024", kind: "Seminar" },
    { title: "Deep Learning Solutions to Improve Plant Yield Using Multi-Omics Data.", venue: "NRC, Aquatic and Crop Resource Development", date: "July 2023", kind: "Seminar" },
    { title: "Ways of Incorporating Deep Learning in Detecting Autism Spectrum Disorder.", venue: "Division of Biomedical Engineering, USask", date: "May 2019", kind: "Seminar" },
  ],

  teaching: {
    lecturer: [
      { course: "Guest Lecturer, AI and Data Driven Methods in Biomedical Imaging and Physics (BMP 254)", year: "2026", where: "Stanford School of Medicine", body: "Graph-based methods in medical science — biological networks, GNNs, multi-omics and imaging integration." },
      { course: "Lecturer, Department of Computer Science and Engineering", year: "2016 — 2017", where: "Bangladesh University", body: "Designed and delivered seven undergraduate courses including Image Processing, AI, VLSI Design, Digital Electronics, DSP, Numerical Methods." },
      { course: "TA Coordinator, Introduction to Computer Science (CMPT 141)", year: "2020 — 2021", where: "University of Saskatchewan", body: "Managed 13 TAs for a 250-student course; ensured consistent grading, distributed marking, facilitated student communication." },
      { course: "Guest Lecturer, Information Visualization (CMPT 384)", year: "2023", where: "University of Saskatchewan", body: "Deep learning visualization techniques and their application to digital agriculture." },
    ],
    ta: [
      "Image Processing and Computer Vision (CMPT 487/819), Fall 2023",
      "Introduction to Artificial Intelligence (CMPT 317), Winter 2023",
      "Algorithm Design Analysis and Correctness (CMPT 360), Fall 2022",
      "Principles of Computer Science (CMPT 145), Winter 2022",
      "Deep Learning and Applications (CMPT 498/898), Fall 2021",
      "Introduction to Computer Science (CMPT 141), Winter 2020",
    ],
    mentoring: [
      { name: "Ridvan Yesiloglu", level: "PhD Student", where: "Stanford School of Medicine", advisor: "Md. Tauhidul Islam" },
      { name: "Tracy Xue", level: "Asst. Clinical Research Coordinator", where: "Stanford School of Medicine", advisor: "Md. Tauhidul Islam" },
      { name: "Ariana Rahman", level: "Undergraduate", where: "Stanford School of Medicine", advisor: "Md. Tauhidul Islam" },
      { name: "Arman Heydari", level: "Master's Student", where: "University of Saskatchewan", advisor: "Debajyoti Mondal" },
      { name: "Alexander Rahman", level: "Research Mentee", where: "Current mentoring", advisor: "Research guidance and project development" },
      { name: "Yuwei Xue", level: "Research Mentee", where: "Stanford School of Medicine", advisor: "Knowledge-graph learning and clinical AI" },
      { name: "Sayeed Sajjad Razin", level: "MSc Student", where: "Bangladesh University of Engineering and Technology (BUET)", advisor: "Research mentoring and project development" },
      { name: "Md. Tazuddin Ahmed", level: "MSc Student", where: "Bangladesh University of Engineering and Technology (BUET)", advisor: "Research mentoring and project development" },
      { name: "Mehdi Khalaj", level: "Undergraduate", where: "University of Saskatchewan", advisor: "Ian Stavness" },
      { name: "Shagufta Zahid", level: "Undergraduate", where: "Bangladesh University", advisor: "Sakib Mostafa" },
      { name: "Bipul Dutta", level: "Undergraduate", where: "Bangladesh University", advisor: "Sakib Mostafa" },
    ],
  },

  stanfordCollaborators: [
    { name: "Md Tauhidul Islam", role: "Assistant Professor, Radiation Oncology", note: "Postdoctoral faculty sponsor and senior collaborator." },
    { name: "Lei Xing", role: "Jacob Haimson & Sarah S. Donaldson Professor of Medical Physics", note: "Senior author on three Nature-family submissions." },
    { name: "Yuming Jiang", role: "Professor", note: "Dynomap collaborator." },
    { name: "James Zou", role: "Associate Professor of Biomedical Data Science", note: "Machine learning for biomedical applications." },
    { name: "Maximilian Diehn", role: "Jack, Lulu & Sam Willson Professor in Cancer Biology · Vice Chair, Radiation Oncology", note: "Thoracic oncology and ctDNA-based early detection." },
    { name: "Ash A. Alizadeh", role: "Moghadam Family Professor of Medicine, Oncology, and Hematology", note: "Pioneering work on ctDNA and cancer molecular profiling." },
    { name: "Tarik F. Massoud", role: "Professor of Neuroradiology and Molecular Imaging", note: "Molecular and translational imaging." },
    { name: "Joseph Liao", role: "Professor of Urology", note: "Clinical knowledge-graph collaborator." },
  ],

  collabClusters: [
    {
      label: "Stanford",
      city: "Stanford, CA",
      people: ["Lei Xing", "Maximilian Diehn", "Ash A. Alizadeh", "Tarik F. Massoud", "Erinn Rankin", "Anusha Kalbasi", "James Zou", "Mohammad Esfahani", "Md. Tauhidul Islam"],
    },
    {
      label: "Saskatchewan",
      city: "Saskatoon, Canada",
      people: ["Debajyoti Mondal", "Ian Stavness", "Julita Vassileva", "Amin Elshorbagy", "Chanchal Roy", "Banani Roy", "Leon Kochian", "Kishore Gali", "Mrigank Rochan"],
    },
    {
      label: "NRC & GIFS",
      city: "Saskatoon, Canada",
      people: ["Sateesh Kagale", "Pankaj Bhowmik", "David Konkin", "Sampath Perumal", "Shweta Kalve", "Karim Panjvani", "Kevin Koh"],
    },
    {
      label: "Calgary",
      city: "Calgary, Canada",
      people: ["Marcus Samuel", "Muhammad Jamshed"],
    },
    {
      label: "Manitoba",
      city: "Winnipeg, Canada",
      people: ["Christopher Henry", "Christopher Bidinosti", "Michael Alexander Beck"],
    },
    {
      label: "Industry",
      city: "Global",
      people: ["William Van Der Camp · Google", "Marin Pecar · NRGene", "Raju Soolanayakanahally · AAFC", "Jarin Tasnim · Callian AT"],
    },
    {
      label: "International",
      city: "Worldwide",
      people: ["Rajeev Varshney · Murdoch", "Murukarthick Jayakodi · Texas A&M", "Sanu Arora · John Innes Centre", "Laura Botigué · CRAG", "Masud Fahim · Vaasa", "Shangpeng Sun · McGill", "ABM Aowlad Hossain · KUET"],
    },
  ],

  skills: {
    "Research areas": "Interpretable AI · Cancer liquid biopsy · cfRNA / ctDNA modeling · Multimodal cancer AI · Diagnostic imaging integration · Digital pathology · Multi-omics integration · Graph foundation models · Spatial representation learning · Cancer genomics",
    "Programming": "Python · C++ · MATLAB · JavaScript · MySQL · SQL",
    "Deep learning": "PyTorch · TensorFlow · Keras · Scikit-learn",
    "Scientific computing": "NumPy · Pandas · NetworkX · iGraph · PIL · OpenCV",
    "High-performance computing": "Slurm clusters · Multi-GPU distributed training · Snakemake workflows",
    "Web & database": "Django · React · jQuery · Ajax",
    "Tools & platforms": "AWS · Google Cloud Platform · Jupyter · Git · Linux",
  },

  service: {
    journals: "ACM Transactions on Computing for Healthcare (1) · IEEE TETCI (1) · IEEE Access (8) · Frontiers in Neuroscience: Brain Imaging Methods (2) · Frontiers in Plant Science (2) · Elsevier Neurocomputing (2) · BMC Plant Methods (1)",
    conferences: "MICCAI (2026) · 32nd Canadian Conference on Computational Geometry (1) · IEEE BIBM (2) · ICCABS (1)",
    organization: [
      "Research Fest Organizer, CS Graduate Council, USask, 2021",
      "Global Village Organizer, USask Student Union, 2021",
      "Local Organizer, 32nd Canadian Conf. on Computational Geometry, 2020",
      "Local Organizer, IEEE EICT, KUET, 2015",
    ],
    leadership: [
      "Vice President (Social), CS Graduate Council, USask, 2020 — 2021",
      "President, Bangladesh Students Association, USask, 2020 — 2021",
      "Vice President, Bangladesh Students Association, USask, 2018 — 2019",
    ],
  },

  media: [
    { headline: "Unpacking the black box of AI", outlet: "College of Arts and Science, University of Saskatchewan", year: "October 2025", format: "Alumni profile", description: "Explainable AI and interpretable cancer-detection models at Stanford.", url: "https://artsandscience.usask.ca/news/articles/11128/Unpacking_the_black_box_of_AI" },
    { headline: "Multimodal AI for cancer research and medicine", outlet: "CBC Canada", year: "2025", format: "Video interview", description: "Combining imaging, genomic, and clinical information for interpretable cancer analysis and precision medicine.", url: "https://www.cbc.ca/player/play/video/9.6948775" },
    { headline: "This U of S grad wants to ensure you can trust AI", outlet: "The Morning Edition — Saskatchewan, CBC Radio", year: "October 2025", format: "Radio interview", description: "Why medical AI must be understandable before it can be trusted in cancer diagnosis.", url: "https://www.cbc.ca/listen/live-radio/1-66-the-morning-edition-sask/clip/16178291-this-u-s-grad-wants-ensure-trust-ai" },
    { headline: "Diving into deep learning: USask research", outlet: "University of Saskatchewan News", year: "February 2022", format: "Research feature", description: "Explainable deep learning for plant phenotyping, food security, and other high-stakes applications.", url: "https://news.usask.ca/articles/research/2022/research-diving-into-deep-learning-usask-research.php" },
  ],

  references: [
    { name: "Md. Tauhidul Islam", role: "Postdoctoral Supervisor · Assistant Professor", where: "Radiation Oncology, Stanford School of Medicine", email: "tauhid@stanford.edu" },
    { name: "Lei Xing", role: "Senior Research Collaborator · Jacob Haimson & Sarah S. Donaldson Professor", where: "Medical Physics, Stanford School of Medicine", email: "lei@stanford.edu" },
    { name: "Debajyoti Mondal", role: "PhD Supervisor · Associate Professor", where: "Computer Science, University of Saskatchewan", email: "d.mondal@usask.ca" },
    { name: "Ian Stavness", role: "PhD Committee Member & Mitacs Supervisor · Professor", where: "Computer Science, University of Saskatchewan", email: "stavness@usask.ca" },
  ],
};
