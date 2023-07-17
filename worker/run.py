import os, filecmp

codes = {200: "success", 404: "file not found", 400: "error", 408: "timeout"}


def compile(file, lang):
    if lang == "python3":
        return 200

    if os.path.isfile(file):
        if lang == "c":
            os.system("gcc " + file + " > output.txt")
        elif lang == "cpp":
            os.system("g++ " + file + " > output.txt")
        elif lang == "java":
            os.system("javac " + file + " > output.txt")
        if (os.path.isfile("a.out")) or (os.path.isfile("main.class")):
            return 200
        else:
            return 400
    else:
        return 404


def run(file, input, timeout, lang):
    cmd = ""
    if lang == "java":
        cmd += "java main"
    elif lang == "c" or lang == "cpp":
        cmd += "./a.out"
    elif lang == "python3":
        cmd += "python3 " + file

    r = os.system("timeout " + timeout + " " + cmd + " < " + input + "> " + testout)

    if r == 0:
        return 200
    elif r == 31744:
        return 408
    else:
        return 400


def match(output):
    if os.path.isfile("out.txt") and os.path.isfile(output):
        b = filecmp.cmp("out.txt", output)
        os.remove("out.txt")
        return b
    else:
        return 404


params = open(os.getcwd() + "app/param.txt").read().strip().split(sep=" ")
folder = str(params[1])
path = os.getcwd() + r"app/" + folder + "//"
file = "source.cpp"


os.chdir(path)
lang = params[0]
timeout = str(min(15, int(params[2])))


testin = "input.txt"
testout = "output.txt"

status = compile(file, lang)
if status == 200:
    status = run(file, testin, timeout, lang)
print(codes[status])
