from flask import Flask, render_template
import random
app = Flask(__name__)

found_words = []
boggle_dice = ['AAEEGN', 'ABBJOO', 'ACHOPS', 'AFFKPS', 'AOOTTW', 'CIMOTU', 'DEILRX', 'DELRVY', 'DISTTY', 'EEGHNW', 'EEINSU', 'EHRTVW', 'EIOSST', 'ELRTTY', 'HIMNUQu', 'HLNNRZ']

boggle_layout = []

def is_valid_word(word):
    file = open('wordlist.txt')
    for line in file:
        if word.lower() == (line.strip('\n')):
            return True
    file.close()
    return False

random.shuffle(boggle_dice)

for i in range(4):
    boggle_layout.append([])
    for j in range(4):
        random_number = random.randint(0, 5)
        if random_number < 5 or len(boggle_dice[(i * 4 + j)]) == 6:
            boggle_layout[i].append(boggle_dice[(i * 4 + j)][random_number])
        else:
            boggle_layout[i].append(boggle_dice[(i * 4 + j)][5:7])

@app.route('/')
def index():
    return render_template('index.html', found_words=found_words, boggle_layout=boggle_layout)

@app.route('/submit/<name>', methods=['GET'])
def submit(name):
    global found_words
    if is_valid_word(name) and name not in found_words and len(name) >= 3:
        found_words.append(name) 
    return ''
