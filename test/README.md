Simple Database
This is a simple object database that stores and retrieves objects from the file system.

Standard repository/dev stuff: README.md, package.json, .gitignore, .eslintrc, .travis.yml, tests, meaningful commits, named npm scripts, etc.


Doc/Resources
Node fs docs - specifically the methods readdir, readFile, writeFile, and unlink
Node path docs - specifically the methods join and possibly resolve
JSON stringify and parse
Checkout mkdirp and rimraf on npm!
Description:
Library has:

A Store class that takes a name of a directory to use and then stores and retrieves objects by writing and reading them to files in the directory.