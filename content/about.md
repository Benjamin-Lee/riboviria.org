# About RVMT

The **RNA Viruses in Metatranscriptomes** (RVMT) database is a collection of viruses and associated data spanning.
This database is designed to be used by researchers and researchers interested in the study of RNA viruses.

## Introduction

RNA viruses are among the most diverse biological entities in the world.
However, due to this massive variety, it is not possible to identify and study each RNA virus individually with laboratory experimentation.
Advances in sequencing technology have allowed us to capture the genomes of these viruses which can tell us about their evolution and structure.
By processing vast amounts of sequencing data available via the Joint Genome Institutes's Integrated Microbial Genomes (IMG) system, we have been able to create a database of RNA viruses.
RVMT represents the result of this research.

## User Guide

For full documentation of the data, please see the [user guide](/user-guide).

## Citation

If you want to cite this dataset, please use the following citation:

> Uri Neri, Yuri I. Wolf, Simon Roux, Antonio Camargo, Benjamin Lee, Darius Kazlauskas, I. Min Chen, Natalia Ivanova, Lisa Zeigler, David Paez-Espino, Donald A. Bryant, Devaki Bhaya, RNA Virus Discovery Consortium, Mart Krupovic, Valerian V. Dolja, Nikos C. Kyrpides, Eugene V. Koonin, Uri Gophna. (2022). A five-fold expansion of the global RNA virome reveals multiple new clades of RNA bacteriophages.

## Frequently Asked Questions

#### Where can I find the code for the project?

The code for the discovery pipeline, analysis is [available on GitHub](https://github.com/UriNeri/RVMT). The website's [source code](https://github.com/Benjamin-Lee/riboviria.org) is also available. All code for the project is open source and under the MIT license.

#### Are there restrictions on using the data?

No. We just ask that you cite the paper describing this dataset if you use it in your own work and/or publication.

#### What's the data format?

Several different data formats are used in the database:

- Sequences are stored in [gzipped](https://en.wikipedia.org/wiki/Gzip) [FASTA format](https://en.wikipedia.org/wiki/FASTA_format)
- Trees are stored in [Newick format](https://en.wikipedia.org/wiki/Newick_format)
- Metadata, annotations, and IMG scaffold cards are stored in [TSV format](https://en.wikipedia.org/wiki/Tab-separated_values)

For each taxon, there is also a zip file containing all the files for that taxon. For full information, please see the [user guide](/user-guide).

#### How do I extract the sequences from a .fasta.gzip file?

Use the command `gunzip <file>` in the terminal.
If you aren't familiar with the command line, you can uncompress it using a program like [7-Zip](https://www.7-zip.org/).

## Acknowledgements

The RVMT team would like to thank the following people for their contributions:

- XXX
- XXX
- XXX
