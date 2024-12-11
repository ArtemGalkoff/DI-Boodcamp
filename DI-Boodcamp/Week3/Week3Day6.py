import json
'''
import random
def get_words_from_file(file_path):
    words = []
    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            words.extend(line.strip().split())
    return words

word_list = get_words_from_file('word_list.txt')
print(word_list)


def get_random_sentence(length):
    words = get_words_from_file('word_list.txt')
    sentence = random.choices(words, k=length)
    return ' '.join(sentence).lower()


def main():
    while True:
        try:
            length = int(input(
                "This program allows you to output a random sentence from the number of words you specify.\nEnter an integer between 2 and 20: "))

            if length < 2 or length > 20:
                print('You must input a number from 2 to 20.')
            else:
                random_sentence = get_random_sentence(length)
                print("Your sentence is:", random_sentence)
                break
        except ValueError:
            print('You must input only a number.')

main()
'''

#Ex 2

sampleJson = """{ 
   "company":{ 
      "employee":{ 
         "name":"emma",
         "payable":{ 
            "salary":7000,
            "bonus":800
         }
      }
   }
}"""

data = json.loads(sampleJson)

salary = data['company']['employee']['payable']['salary']
print("Salary:", salary)

data['company']['employee']['birth_date'] = "1993-09-28"


with open('output.json', 'w', encoding='utf-8') as json_file:
    json.dump(data, json_file, indent=4, ensure_ascii=False)





















