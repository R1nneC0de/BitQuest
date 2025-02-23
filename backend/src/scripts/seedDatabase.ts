import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Challenge from '../models/Challenge';

dotenv.config();

const sampleChallenges = [
  {
    roomId: 1,
    challengeId: 1,
    title: "Hello World Function",
    description: "Write a function that returns 'Hello, World!'",
    difficulty: "Easy",
    category: "basic programming",
    starterCode: {
      python: 'def hello_world():\n    # Write your code here\n    pass',
      java: 'public class Solution {\n    public static String helloWorld() {\n        // Write your code here\n        return "";\n    }\n}',
      cpp: 'string helloWorld() {\n    // Write your code here\n    return "";\n}'
    },
    testCases: [
      { input: "", output: "Hello, World!" }
    ],
    helpfulLinks: {
      python: {
        youtube: "https://www.youtube.com/watch?v=DfVCR4D5LZ8",
        website: "https://www.w3schools.com/python/ref_func_print.asp"
      },
      java: {
        youtube: "https://www.youtube.com/watch?v=eIrMbAQSU34",
        website: "https://www.w3schools.com/java/java_methods.asp"
      },
      cpp: {
        youtube: "https://www.youtube.com/watch?v=vLnPwxZdW4Y",
        website: "https://www.w3schools.com/cpp/cpp_functions.asp"
      }
    }
  },
  {
    roomId: 1,
    challengeId: 2,
    title: "Sum of Two Numbers",
    description: "Write a function that takes two numbers as parameters and returns their sum.",
    difficulty: "Easy",
    category: "basic programming",
    starterCode: {
      python: 'def add_numbers(a: int, b: int) -> int:\n    # Write your code here\n    pass',
      java: 'public class Solution {\n    public static int addNumbers(int a, int b) {\n        // Write your code here\n        return 0;\n    }\n}',
      cpp: 'int addNumbers(int a, int b) {\n    // Write your code here\n    return 0;\n}'
    },
    testCases: [
      { input: "2, 3", output: "5" },
      { input: "-1, 1", output: "0" }
    ],
    helpfulLinks: {
      python: {
        youtube: "https://www.youtube.com/watch?v=khKv-8q7YmY",
        website: "https://www.w3schools.com/python/python_functions.asp"
      },
      java: {
        youtube: "https://www.youtube.com/watch?v=1HTsLK_m2ao",
        website: "https://www.w3schools.com/java/java_methods_param.asp"
      },
      cpp: {
        youtube: "https://www.youtube.com/watch?v=bsWWHo4KDHE",
        website: "https://www.w3schools.com/cpp/cpp_function_param.asp"
      }
    }
  },
  {
    roomId: 1,
    challengeId: 3,
    title: "Find Maximum",
    description: "Write a function that finds the maximum number in an array of integers.",
    difficulty: "Medium",
    category: "basic programming",
    starterCode: {
      python: 'def find_max(arr: list) -> int:\n    # Write your code here\n    pass',
      java: 'public class Solution {\n    public static int findMax(int[] arr) {\n        // Write your code here\n        return 0;\n    }\n}',
      cpp: 'int findMax(vector<int>& arr) {\n    // Write your code here\n    return 0;\n}'
    },
    testCases: [
      { input: "[1, 3, 2, 5, 4]", output: "5" },
      { input: "[-1, -5, -2, -8]", output: "-1" }
    ],
    helpfulLinks: {
      python: {
        youtube: "https://www.youtube.com/watch?v=KzqSDvzOFNA",
        website: "https://www.w3schools.com/python/python_lists.asp"
      },
      java: {
        youtube: "https://www.youtube.com/watch?v=1HTsLK_m2ao",
        website: "https://www.w3schools.com/java/java_arrays.asp"
      },
      cpp: {
        youtube: "https://www.youtube.com/watch?v=bsWWHo4KDHE",
        website: "https://www.w3schools.com/cpp/cpp_arrays.asp"
      }
    }
  },
  {
    roomId: 1,
    challengeId: 4,
    title: "Reverse String",
    description: "Write a function that reverses a string without using built-in reverse functions.",
    difficulty: "Medium",
    category: "basic programming",
    starterCode: {
      python: 'def reverse_string(s: str) -> str:\n    # Write your code here\n    pass',
      java: 'public class Solution {\n    public static String reverseString(String s) {\n        // Write your code here\n        return "";\n    }\n}',
      cpp: 'string reverseString(string s) {\n    // Write your code here\n    return "";\n}'
    },
    testCases: [
      { input: "hello", output: "olleh" },
      { input: "world!", output: "!dlrow" }
    ],
    helpfulLinks: {
      python: {
        youtube: "https://www.youtube.com/watch?v=R1qjx_JJ6J4",
        website: "https://www.w3schools.com/python/python_strings.asp"
      },
      java: {
        youtube: "https://www.youtube.com/watch?v=P1OpYHYuXTY",
        website: "https://www.w3schools.com/java/java_strings.asp"
      },
      cpp: {
        youtube: "https://www.youtube.com/watch?v=W8hPsBquD6Y",
        website: "https://www.w3schools.com/cpp/cpp_strings.asp"
      }
    }
  },
  {
    roomId: 1,
    challengeId: 5,
    title: "Binary Search Tree Implementation",
    description: "Implement a binary search tree with insert, delete, and search operations.",
    difficulty: "Hard",
    category: "data structures",
    starterCode: {
      python: 'class Node:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\nclass BST:\n    def __init__(self):\n        self.root = None\n    \n    def insert(self, value):\n        # Write your code here\n        pass\n    \n    def search(self, value):\n        # Write your code here\n        pass\n    \n    def delete(self, value):\n        # Write your code here\n        pass',
      java: 'class Node {\n    int value;\n    Node left;\n    Node right;\n    \n    Node(int value) {\n        this.value = value;\n    }\n}\n\nclass BST {\n    Node root;\n    \n    public void insert(int value) {\n        // Write your code here\n    }\n    \n    public boolean search(int value) {\n        // Write your code here\n        return false;\n    }\n    \n    public void delete(int value) {\n        // Write your code here\n    }\n}',
      cpp: 'struct Node {\n    int value;\n    Node* left;\n    Node* right;\n    \n    Node(int val) : value(val), left(nullptr), right(nullptr) {}\n};\n\nclass BST {\n    Node* root;\n    \n public:\n    BST() : root(nullptr) {}\n    \n    void insert(int value) {\n        // Write your code here\n    }\n    \n    bool search(int value) {\n        // Write your code here\n        return false;\n    }\n    \n    void delete(int value) {\n        // Write your code here\n    }\n};'
    },
    testCases: [
      { input: "insert(5), insert(3), insert(7), search(3)", output: "true" },
      { input: "insert(5), delete(5), search(5)", output: "false" }
    ],
    helpfulLinks: {
      python: {
        youtube: "https://www.youtube.com/watch?v=lFq5mYUWEBk",
        website: "https://www.geeksforgeeks.org/binary-search-tree-set-1-search-and-insertion/"
      },
      java: {
        youtube: "https://www.youtube.com/watch?v=M6lYob8STMI",
        website: "https://www.baeldung.com/java-binary-tree"
      },
      cpp: {
        youtube: "https://www.youtube.com/watch?v=COZK7NATh4k",
        website: "https://www.geeksforgeeks.org/binary-search-tree-set-1-search-and-insertion-cpp/"
      }
    }
  },
  {
    roomId: 1,
    challengeId: 6,
    title: "Dynamic Programming: Longest Common Subsequence",
    description: "Implement a function to find the length of the Longest Common Subsequence between two strings using dynamic programming.",
    difficulty: "Hard",
    category: "algorithms",
    starterCode: {
      python: 'def longest_common_subsequence(text1: str, text2: str) -> int:\n    # Write your code here\n    pass',
      java: 'public class Solution {\n    public static int longestCommonSubsequence(String text1, String text2) {\n        // Write your code here\n        return 0;\n    }\n}',
      cpp: 'int longestCommonSubsequence(string text1, string text2) {\n    // Write your code here\n    return 0;\n}'
    },
    testCases: [
      { input: '"abcde", "ace"', output: "3" },
      { input: '"abc", "def"', output: "0" }
    ],
    helpfulLinks: {
      python: {
        youtube: "https://www.youtube.com/watch?v=ASoaQq66foQ",
        website: "https://www.geeksforgeeks.org/python-longest-common-subsequence/"
      },
      java: {
        youtube: "https://www.youtube.com/watch?v=LAKWWDX3sGw",
        website: "https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/"
      },
      cpp: {
        youtube: "https://www.youtube.com/watch?v=NnD96abizww",
        website: "https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/"
      }
    }
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    await Challenge.deleteMany({});
    await Challenge.insertMany(sampleChallenges);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 