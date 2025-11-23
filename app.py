from flask import Flask, render_template, redirect
import random
app = Flask(__name__)

found_words = []
boggle_dice = ['AAEEGN', 'ABBJOO', 'ACHOPS', 'AFFKPS', 'AOOTTW', 'CIMOTU', 'DEILRX', 'DELRVY', 'DISTTY', 'EEGHNW', 'EEINSU', 'EHRTVW', 'EIOSST', 'ELRTTY', 'HIMNUQu', 'HLNNRZ']
boggle_layout = []
score = 0

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
    return render_template('index.html', found_words=found_words, boggle_layout=boggle_layout, score=score)

@app.route('/submit/<name>', methods=['GET', 'POST'])
def submit(name):
    global found_words
    global score
    if is_valid_word(name) and name not in found_words and len(name) >= 3:
        found_words.append(name.upper()) 
        if len(name) == 3 or len(name) == 4:
            score += 1
        elif len(name) == 5:
            score += 2
        elif len(name) == 6:
            score += 3
        elif len(name) == 7:
            score += 5
        elif len(name) == 8:
            score += 11
        else:
            print("An error has occured")
    return [found_words, score]

@app.route('/restart')
def restart():
    global found_words
    global boggle_layout
    global score
    global boggle_dice
    found_words = []
    boggle_layout = []
    score = 0
    random.shuffle(boggle_dice)
    for i in range(4):
        boggle_layout.append([])
        for j in range(4):
            random_number = random.randint(0, 5)
            if random_number < 5 or len(boggle_dice[(i * 4 + j)]) == 6:
                boggle_layout[i].append(boggle_dice[(i * 4 + j)][random_number])
            else:
                boggle_layout[i].append(boggle_dice[(i * 4 + j)][5:7])
    return boggle_layout
