# Homework Assignment

Your mission, should you choose to accept it, is to write a library which takes in an array of records of variable size and splits the input to batches of records (array of arrays) suitably sized for delivery to a system which has following limits:

maximum size of output record is 1 MB, larger records should be discarded
maximum size of output batch is 5 MB
maximum number of records in an output batch is 500

Input for the library is: `[<record1>, <record2>, <record3>, ... , <recordn>]`

Output is: `[<batch1>, <batch2>, ..., <batchn>]` where each batch is an array of records just like in the input.

The records can be assumed to be strings of variable length and they have to pass intact through the system and records should stay in the order that they arrive.
