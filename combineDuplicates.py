file = "1000CommonGermanWords.txt"

dictionary = {}

def addListDefToDictionary(defList):
    for d in defList:
        dictionary[term].append(d)

with open(file, "r") as rf:
    lines = rf.readlines()
    for line in lines:
        splitWords = line.split()
        term = splitWords[0]

        definition = splitWords[1:] # definition :: list

        if term in dictionary.keys():
            if len(definition) > 1:
                addListDefToDictionary(definition)
            else:
                dictionary[term].append(definition[0])
        else:
            dictionary[term] = definition
    rf.close()

def listToString(l1):
    string = ""
    for e in l1:
        string += e +" "
    return string


newData = []
for term, definition in dictionary.items():
    newData.append(term + " " + listToString(definition) +"\n")
with open(file, 'w') as wf:
    wf.writelines(newData)
    wf.close()

print(listToString(["a", "b", "c"]))