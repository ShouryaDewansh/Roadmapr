from typing import List, Dict
import json
import traceback

def generate_roadmap(title: str, skill_level: str, description: str):
    try:
        # Validate inputs
        if not title or not skill_level or not description:
            raise ValueError("Title, skill level, and description are required")

        # Map common topics to predefined roadmaps
        title_lower = title.lower()
        if "python" in title_lower or "programming" in title_lower:
            modules = get_web_development_roadmap(skill_level)
        elif "web" in title_lower or "frontend" in title_lower or "backend" in title_lower:
            modules = get_web_development_roadmap(skill_level)
        elif "machine learning" in title_lower or "ml" in title_lower or "ai" in title_lower:
            modules = get_machine_learning_roadmap(skill_level)
        elif "data" in title_lower or "analytics" in title_lower:
            modules = get_data_science_roadmap(skill_level)
        elif "finance" in title_lower or "quant" in title_lower:
            modules = get_quant_finance_roadmap()
        else:
            modules = get_default_roadmap(title)

        return {"modules": modules}

    except Exception as e:
        print(f"Error in generate_roadmap: {str(e)}")
        print(f"Traceback: {traceback.format_exc()}")
        return create_fallback_roadmap(title)

def create_fallback_roadmap(title: str):
    """Create a basic roadmap structure when the AI generation fails."""
    return {
        "modules": [
            {
                "title": "Getting Started",
                "description": f"Introduction to {title}",
                "resources": [
                    {
                        "title": "Introduction Guide",
                        "description": "A beginner-friendly guide",
                        "url": "https://example.com",
                        "resource_type": "documentation"
                    }
                ]
            }
        ]
    }

def get_quant_finance_roadmap() -> List[Dict]:
    return [
        {
            "title": "Mathematics and Statistics Foundations",
            "description": "Build a strong foundation in mathematics and statistics required for quantitative finance",
            "order": 1,
            "estimated_time": "40 hours",
            "resources": [
                {
                    "title": "Khan Academy - Probability and Statistics",
                    "description": "Free comprehensive course covering probability and statistics fundamentals",
                    "url": "https://www.khanacademy.org/math/statistics-probability",
                    "resource_type": "course"
                },
                {
                    "title": "MIT OpenCourseWare - Linear Algebra",
                    "description": "University-level course on linear algebra essential for quantitative finance",
                    "url": "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
                    "resource_type": "course"
                },
                {
                    "title": "Calculus for Finance",
                    "description": "Applied calculus concepts in financial mathematics",
                    "url": "https://www.edx.org/learn/calculus",
                    "resource_type": "course"
                }
            ]
        },
        {
            "title": "Financial Markets and Instruments",
            "description": "Learn about different financial instruments and how markets operate",
            "order": 2,
            "estimated_time": "30 hours",
            "resources": [
                {
                    "title": "Yale Financial Markets Course",
                    "description": "Comprehensive introduction to financial markets by Robert Shiller",
                    "url": "https://www.coursera.org/learn/financial-markets-global",
                    "resource_type": "course"
                },
                {
                    "title": "Investopedia - Financial Instruments",
                    "description": "Detailed articles on various financial instruments",
                    "url": "https://www.investopedia.com/terms/f/financialinstrument.asp",
                    "resource_type": "article"
                },
                {
                    "title": "Options, Futures, and Other Derivatives",
                    "description": "Classic textbook by John C. Hull",
                    "url": "https://www.pearson.com/en-us/subject-catalog/p/options-futures-and-other-derivatives/P200000006223",
                    "resource_type": "book"
                }
            ]
        },
        {
            "title": "Programming for Finance",
            "description": "Learn essential programming skills for quantitative finance",
            "order": 3,
            "estimated_time": "50 hours",
            "resources": [
                {
                    "title": "Python for Finance",
                    "description": "Learn Python programming with financial applications",
                    "url": "https://www.datacamp.com/courses/introduction-to-python-for-finance",
                    "resource_type": "course"
                },
                {
                    "title": "Quantitative Economics with Python",
                    "description": "Free online textbook by QuantEcon",
                    "url": "https://python.quantecon.org/",
                    "resource_type": "documentation"
                },
                {
                    "title": "Financial Library Tutorial - QuantLib",
                    "description": "Introduction to using QuantLib for financial applications",
                    "url": "https://www.quantlib.org/docs.shtml",
                    "resource_type": "documentation"
                }
            ]
        },
        {
            "title": "Quantitative Trading and Strategy",
            "description": "Apply your knowledge to trading strategies and portfolio management",
            "order": 4,
            "estimated_time": "60 hours",
            "resources": [
                {
                    "title": "Algorithmic Trading with Python",
                    "description": "Build automated trading systems using Python",
                    "url": "https://www.youtube.com/watch?v=xfzGZB4HhEE",
                    "resource_type": "video"
                },
                {
                    "title": "Machine Learning for Trading",
                    "description": "Apply ML techniques to financial markets",
                    "url": "https://www.udacity.com/course/machine-learning-for-trading--ud501",
                    "resource_type": "course"
                },
                {
                    "title": "Risk Management in Trading",
                    "description": "Learn about risk management principles in quantitative trading",
                    "url": "https://www.investopedia.com/articles/active-trading/041814/four-most-commonlyused-indicators-trend-trading.asp",
                    "resource_type": "article"
                }
            ]
        }
    ]

def get_web_development_roadmap(skill_level: str) -> List[Dict]:
    return [
        {
            "title": "HTML & CSS Fundamentals",
            "description": "Learn the building blocks of web development",
            "order": 1,
            "estimated_time": "30 hours",
            "resources": [
                {
                    "title": "MDN Web Docs - HTML",
                    "description": "Comprehensive guide to HTML5",
                    "url": "https://developer.mozilla.org/en-US/docs/Learn/HTML",
                    "resource_type": "documentation"
                },
                {
                    "title": "CSS Fundamentals",
                    "description": "Learn modern CSS including Flexbox and Grid",
                    "url": "https://web.dev/learn/css/",
                    "resource_type": "course"
                },
                {
                    "title": "Frontend Masters Bootcamp",
                    "description": "Complete introduction to HTML and CSS",
                    "url": "https://frontendmasters.com/bootcamp/",
                    "resource_type": "course"
                }
            ]
        },
        {
            "title": "JavaScript Essentials",
            "description": "Master JavaScript programming for web development",
            "order": 2,
            "estimated_time": "40 hours",
            "resources": [
                {
                    "title": "JavaScript.info",
                    "description": "Modern JavaScript Tutorial",
                    "url": "https://javascript.info/",
                    "resource_type": "documentation"
                },
                {
                    "title": "Eloquent JavaScript",
                    "description": "Free online book for JavaScript",
                    "url": "https://eloquentjavascript.net/",
                    "resource_type": "book"
                },
                {
                    "title": "FreeCodeCamp JavaScript Course",
                    "description": "Interactive JavaScript learning",
                    "url": "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
                    "resource_type": "course"
                }
            ]
        },
        {
            "title": "Frontend Frameworks",
            "description": "Learn modern frontend frameworks",
            "order": 3,
            "estimated_time": "50 hours",
            "resources": [
                {
                    "title": "React Documentation",
                    "description": "Official React.js documentation and tutorials",
                    "url": "https://react.dev/learn",
                    "resource_type": "documentation"
                },
                {
                    "title": "Vue.js Guide",
                    "description": "Vue.js official documentation",
                    "url": "https://vuejs.org/guide/introduction.html",
                    "resource_type": "documentation"
                },
                {
                    "title": "Full Stack Open",
                    "description": "Modern web development with React",
                    "url": "https://fullstackopen.com/en/",
                    "resource_type": "course"
                }
            ]
        }
    ]

def get_machine_learning_roadmap(skill_level: str) -> List[Dict]:
    return [
        {
            "title": "Python Programming Fundamentals",
            "description": "Learn Python basics for machine learning",
            "order": 1,
            "estimated_time": "30 hours",
            "resources": [
                {
                    "title": "Python for Data Science",
                    "description": "DataCamp's Python fundamentals course",
                    "url": "https://www.datacamp.com/courses/intro-to-python-for-data-science",
                    "resource_type": "course"
                },
                {
                    "title": "NumPy and Pandas Tutorials",
                    "description": "Essential Python libraries for ML",
                    "url": "https://numpy.org/learn/",
                    "resource_type": "documentation"
                },
                {
                    "title": "Python Data Science Handbook",
                    "description": "Comprehensive guide to Python for data science",
                    "url": "https://jakevdp.github.io/PythonDataScienceHandbook/",
                    "resource_type": "book"
                }
            ]
        },
        {
            "title": "Machine Learning Basics",
            "description": "Fundamental ML concepts and algorithms",
            "order": 2,
            "estimated_time": "60 hours",
            "resources": [
                {
                    "title": "Andrew Ng's Machine Learning Course",
                    "description": "Foundational ML course on Coursera",
                    "url": "https://www.coursera.org/learn/machine-learning",
                    "resource_type": "course"
                },
                {
                    "title": "Scikit-learn Tutorials",
                    "description": "Learn popular ML library",
                    "url": "https://scikit-learn.org/stable/tutorial/",
                    "resource_type": "documentation"
                },
                {
                    "title": "Fast.ai Practical Deep Learning",
                    "description": "Practical approach to deep learning",
                    "url": "https://course.fast.ai/",
                    "resource_type": "course"
                }
            ]
        }
    ]

def get_data_science_roadmap(skill_level: str) -> List[Dict]:
    return [
        {
            "title": "Data Analysis Fundamentals",
            "description": "Learn the basics of data analysis",
            "order": 1,
            "estimated_time": "40 hours",
            "resources": [
                {
                    "title": "Data Analysis with Python",
                    "description": "FreeCodeCamp's data analysis course",
                    "url": "https://www.freecodecamp.org/learn/data-analysis-with-python/",
                    "resource_type": "course"
                },
                {
                    "title": "SQL Essential Training",
                    "description": "Learn SQL for data analysis",
                    "url": "https://www.kaggle.com/learn/intro-to-sql",
                    "resource_type": "course"
                },
                {
                    "title": "Statistics for Data Science",
                    "description": "Essential statistics concepts",
                    "url": "https://www.khanacademy.org/math/statistics-probability",
                    "resource_type": "course"
                }
            ]
        },
        {
            "title": "Data Visualization",
            "description": "Master data visualization techniques",
            "order": 2,
            "estimated_time": "30 hours",
            "resources": [
                {
                    "title": "Matplotlib & Seaborn Tutorial",
                    "description": "Python visualization libraries",
                    "url": "https://matplotlib.org/stable/tutorials/",
                    "resource_type": "documentation"
                },
                {
                    "title": "Tableau Public",
                    "description": "Learn Tableau for data visualization",
                    "url": "https://public.tableau.com/en-us/s/resources",
                    "resource_type": "documentation"
                },
                {
                    "title": "D3.js Documentation",
                    "description": "Web-based data visualization",
                    "url": "https://d3js.org/",
                    "resource_type": "documentation"
                }
            ]
        }
    ]

def get_default_roadmap(title: str) -> List[Dict]:
    return [{
        "title": "Getting Started",
        "description": f"Begin your journey in {title}",
        "order": 1,
        "estimated_time": "10 hours",
        "resources": [
            {
                "title": "Introduction Resources",
                "description": f"Start learning {title} with these beginner-friendly resources",
                "url": "https://www.coursera.org",
                "resource_type": "course"
            }
        ]
    }] 