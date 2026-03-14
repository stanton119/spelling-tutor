Rough idea:

I want to build a web app to act as a spelling tutor for young children.

It should have a list of game to question about.

the games we should start with:
1. given word pick corresponding picture
2. given picture, select correct spelling
3. given picture and partial spelling, select missing letter
4. hangman

It should ask questions and receive answers from the child.
It should record the questions and answers.
for each game we will record a skill level which is increased following correct answers, and reduces following incorrect answers
The games should adjust the difficulty of the question to reflect the level of the child.
It should not ask questions considered too easy or too hard.
Do not consider the UI too much yet. We will do that later.

---
use superpowers and executing-plans to do docs/plans/2025-03-10-lowercase-text-implementation.md
do not use git worktrees, use just the main branch

---
replace the README.md
---
make the screen size a bit smaller so it fits on web without scrolling (13" MBP)
make it mobile compatible
---
some way to set the current level
some children will be on level 5 already, how to set that
---
word issues:
TOY = bear?
TOP = TOP
JAM = honey?
---
questions cant repeat back to back
---
delay after wrong answer
---
slightly longer delay after answer before moving on