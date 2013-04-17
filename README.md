MongoDBBenchmark
================

Test Environment
-----
All test is run in my MBP, with local single mongod instance. Test is run thru mongo shell.

* Processor: 2.7G i7
* Memory: 16GB 1600 MHz DDR3
* Software: OS X 10.8.3

* Mongod Version: 2.2.3

Bucket Test
-----
This is to test the use of bucket storage of small documents. Resize document size is normally costly and not recommended, because it triggers
document move along with index update. But this test tries to show the metrics in different bucket size and no bucket and how bad/good it is.

Result:

    Big = 500 per array
    small = 5 per array
    no bucket = each as a document.
    total 10000 "atomic doc" inserted.

    > load('bucket.js')
    big bucket size runtime: 20.368
    storageSize with big bucket size  : 11182080
    paddingFactor with big bucket  size: 1.0060000000002791
    small bucket size runtime: 0.375
    storageSize with small bucket size  : 2793472
    paddingFactor with small bucket  size: 1.9980000000003342
    no bucket size runtime: 0.303
    storageSize with no bucket size  : 3055616
    paddingFactor with no bucket  size: 1
    1 big doc size 38.925
    100 small doc size 41.5
    500 raw doc size 50.5

Insertion Test
-----

    insert a plain doc, measure time every 10000 doc insertion completed. It gives 30K/sec.
    > load('insert.js')
    10000 queries spent in 310ms
    10000 queries spent in 301ms
    10000 queries spent in 298ms
    10000 queries spent in 295ms
    10000 queries spent in 310ms
    10000 queries spent in 322ms
    10000 queries spent in 331ms
    10000 queries spent in 318ms
    10000 queries spent in 304ms
    10000 queries spent in 310ms
    10000 queries spent in 304ms
    10000 queries spent in 371ms
    
Query Test
-----
    Query only one doc from the above collection, d.col.findOne({_id:100},{_id:1}), measure time every 10000 queries. 
    It gives 12K/sec.
    > load('query.js')
    10000 queries spent in 787ms
    10000 queries spent in 814ms
    10000 queries spent in 779ms
    10000 queries spent in 800ms
    10000 queries spent in 807ms
    10000 queries spent in 768ms
    10000 queries spent in 797ms
    10000 queries spent in 804ms
    10000 queries spent in 771ms
    10000 queries spent in 790ms
    10000 queries spent in 798ms
    
Query mixed with Insertion Test
-----
    Run above two same time in two different shells. it shows insertion not quite impacted but query is 50% slower.
    insert - 30K/sec, query - 8K/sec
    > load('insert.js')
    10000 queries spent in 300ms
    10000 queries spent in 313ms
    10000 queries spent in 303ms
    10000 queries spent in 319ms
    10000 queries spent in 310ms
    10000 queries spent in 307ms
    10000 queries spent in 294ms
    10000 queries spent in 301ms
    10000 queries spent in 336ms
    10000 queries spent in 312ms
    10000 queries spent in 333ms
    10000 queries spent in 429ms
    
    > load('query.js')
    10000 queries spent in 1202ms
    10000 queries spent in 1204ms
    10000 queries spent in 1211ms
    10000 queries spent in 1281ms
    10000 queries spent in 1192ms
    10000 queries spent in 1160ms
    10000 queries spent in 1453ms
    10000 queries spent in 1220ms
    10000 queries spent in 1167ms
    10000 queries spent in 1260ms
    10000 queries spent in 1267ms
    10000 queries spent in 1139ms
    
Regex Prefix
-----
    With regex prefix query, mongodb can provide auto-complete like service easily. 
    This is the test to measure the speed of prefix query. 
    The dataset collection is pre-appended with random keywords as name field. 
    The collection has 3M+ documents and index is created on name field. Each query fetch 10 documents.
    It gives 4166/sec, 1 ms for each query.
    
    > load('regex/prefix_query.js')
    10000 queries spent in 2517ms
    10000 queries spent in 2543ms
    10000 queries spent in 2640ms
    10000 queries spent in 2581ms
    10000 queries spent in 2660ms
    10000 queries spent in 2546ms
    10000 queries spent in 2526ms

