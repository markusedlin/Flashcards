import random
filename = '1000CommonGermanWords.txt'
statFile = "1000CGWStatistics.txt"

dictionary = {}
modes = ["learn", "test"]

mode = "test"
toWrite = "definition"

def separateTermsFromFile(file):
    with open(file, "r") as f:
        lines = f.readlines()
        for line in lines:
            splitWords = line.split()
            term = splitWords[0]

            definition = splitWords[1]
            definitionList = []
            definitionList.append(definition)

            dictionary[term] = definitionList

def createRandomOrder(dictOfWords):
    dictOfWords = list(dictOfWords.keys())
    random.shuffle(dictOfWords)
    return dictOfWords

def cycleTermsAtRandom(file, numTerms):
    separateTermsFromFile(file)
    order = createRandomOrder(dictionary)[0:numTerms]
    for curTerm in order:
        curDefinitionList = getDefinitionList(curTerm)
        givenAnswer = input(f"{curTerm} ")
        if determineCorrect(curDefinitionList, givenAnswer):
            print("Correct!")
            print(curTerm + printDefinitionList(curDefinitionList))
            printLineBreak()
            addStatistic(statFile,curTerm,True)
        elif givenAnswer == "":
            print(curTerm + printDefinitionList(curDefinitionList))
            addStatistic(statFile,curTerm,False)
        else:
            print("incorrect")
            print(curTerm + printDefinitionList(curDefinitionList))
            if input("Override? y to override, else press ENTER") == "y":
                #adds definition to text file
                addStatistic(statFile,curTerm,True)
            else:
                addStatistic(statFile,curTerm,False)

            printLineBreak()

#----- Statistics ------

def convertListToString(li, delimiter):
    string = ""
    for e in li:
        if e == li[-1]: # if element is in the last position, do not add delimiter at end
            string += str(e)
        else:
            string += str(e)+delimiter
    return string

def addStatistic(file, word, correct):
    # see which words are already in the statistics file:
    wordsInFile = []
    dataToReplaceCurrent = []
    with open(file, 'r') as rf:
        lines = rf.readlines()
        for line in lines:
            splitLine = line.split()
            term = splitLine[0]
            wordsInFile.append(term)
        for line in lines:
            splitLine = line.split()
            term = splitLine[0]
            #determining current score
            score = [0,0]
            if word in wordsInFile:
                score = [int(splitLine[1]),int(splitLine[2])]
            else:
                #dataToReplaceCurrent(str(word) + convertListToString(score, " ") + "\n")
            #updating score if correct
            #newScore = []
                continue
            if correct:
                newScore = [score[0]+1,score[1]]
            else:
                newScore = [score[0],score[1]+1]

            if word == term: # if the word we want to update is equal to the current term on line in file..
                dataToReplaceCurrent.append(word + convertListToString(newScore, " ") + "\n")
                print("updated score")
            else:
                dataToReplaceCurrent.append(line)
        rf.close()
    with open(file, 'w') as wf:
        wf.writelines(dataToReplaceCurrent)
        wf.close()

def newStatisticWordToLineString(word):
    return word + " 0 0\n"

#-----------------------


def getDefinitionList(term):
    if term in dictionary:
        return dictionary[term]
    return None

def printDefinitionList(defList):
    definition = ""
    for d in defList:
        definition += "/"+d
    return definition

def numLines(file):
    return len(open(file, 'r').readlines())

def determineCorrect(correctList, given):
    return given in correctList # considers Case Matching

def printLineBreak():
    print("----------------")

def getIndexSearch(wordList, word):
    for i in range(len(wordList)):
        if word == wordList[i]:
            return i
    return None

cycleTermsAtRandom(filename, 3)