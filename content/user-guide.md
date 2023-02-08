# User Guide

RVMT enables researchers to explore a wide range of data from the global RNA virome.
The user guide provides a brief overview of the data types, access methods, and

## Download the data set

The data are available for download in several methods:  
- From the NERSC's FTP server, using this site a portal to [download](/#download) specific subsets of the data, by slicing to specific taxonomic lineages.  
- From the RVMT Zenodo's archive ([doi:10.5281/zenodo.6091356](https://doi.org/10.5281/zenodo.6091356)). Generally, the Zeonodo deposit is more updated and comprehensive than the download portal.

The FTP server offers the data pre-segmented at each taxonomic level.
If you want to use a command line, we offer a [cURL generator](/#download) that will generate a command for you to execute.

Alternatively, you can retrieve the data (for all data types) directly from the NERSC FTP server from the download panel.
This approach pulls a [zip file](<https://en.wikipedia.org/wiki/Zip_(file_format)>) containing all the data for a selected taxon.
Should you need only a specific file, you can [download it directly](https://ftp.nersc.gov/) by choosing a taxon and then clicking "browse FTP".

If the FTP server is down, you can also download the data from Zenodo's permanent archive.
The data set on Zenodo is not redundant and pre-segmented at each taxonomic level due to size considerations.

## FTP directory structure

Within the FTP server, the data are organized in a directory structure that mirrors the taxonomy.
For each taxon, there is a directory with the taxon, and within that directory, there are subdirectories for each member taxon.

```
➜  Norzivirales tree -L 2
├── Atkinsviridae
│   ├── Atkinsviridae_Contigs.fasta.gz
│   ├── Atkinsviridae_HMMatches.tsv
│   ├── Atkinsviridae_IMG_Scaffold_cart.tsv
│   ├── Atkinsviridae_Info.tsv
│   ├── Atkinsviridae_subtree.newick
│   └── Atkinsviridae.zip
....

```

## Data types

The following data types are included in the data set:

| Type              | Filename                        | Description                                                                                                             |
| :---------------- | :------------------------------ | :---------------------------------------------------------------------------------------------------------------------- |
| Sequences         | `<taxon>.fasta.gz`              | [Gzipped](https://en.wikipedia.org/wiki/Gzip) [FASTA formatted](https://en.wikipedia.org/wiki/FASTA_format) contigs     |
| Metadata          | `<taxon>_Info.tsv`              | Metadata for each contig, including taxonomic information                                                               |
| Annotation        | `<taxon>_HMMatches.tsv`         | Protein domain annotation for each contig, derived from [hmmsearch](http://hmmer.org/)                                  |
| Tree              | `<taxon>_Tree.newick`           | Phylogenetic tree for each taxon                                                                                        |
| IMG Scaffold Cart | `<taxon>_IMG_Scaffold_cart.tsv` | IMG scaffold cart for each taxon                                                                                        |
| Zip               | `<taxon>.zip`                   | A compressed Zip archive with the files listed above [(ZIP format)](<https://en.wikipedia.org/wiki/ZIP_(file_format)>). |

All taxa, as well the root, contain each of the above data types. The sole exception is that the root and any taxon that has one member do not contain a tree.

### Sequences

The sequences are in [gzipped](https://en.wikipedia.org/wiki/Gzip) [FASTA format](https://en.wikipedia.org/wiki/FASTA_format).
Therefore, before using the data you need to decompress the FASTA file (unless your system has native gzip support).
To do so, you will need a tool such as [`gzip`](https://www.gnu.org/software/gzip/) or an alternative tool such as [7-zip](https://www.7-zip.org/).
Decompressing with the command line `gzip` is as easy as running:

```sh
gunzip <file.fasta.gz>
```

By default, `gzip` will decompress the file to the same directory as the original file and then delete the compressed version.
To avoid this, you can use the `-k` flag to prevent the deletion.

#### Example data

```
>ND_040544
GCTATGATGAAGCACCATTACGCTCGAATGTTGCAGATGATCACAGCCATAGGGAATATTAAAGCTTTATGTGCAATGAA
TTACCCAAATCTGGATACTGTAGTCATTATAAGACGATTACTGAATGTAGCGCAATCTGTTAGTAAAATAAATCCCAGTG
...
>ND_040545
ATCCTTCAACTGCTTCGGCCACAATGGCATATGAACTGTATAAGTTGTGTGATTTGGATTTTCTCAAGAAATACATAATG
AAATCTCATAACACAGAACCAGCATCTATTTCTCAATCTGAGGCCTCTAGCATCCGGAAAATATTCACAGCATTCGTTTC
```

### Metadata

Each of contigs in the available FASTA files are listed as a row in the .tsv file, which contains the following metadata columns:

| Column          | Type    | Description                                                                                             |
| :-------------- | :------ | :------------------------------------------------------------------------------------------------------ |
| `Source`        | String  | Identifier of the data source, usually interchangeable with an IMG_Taxon_ID                             |
| `RCR90`         | String  | Mega-Tree leaf membership                                                                               |
| `ND`            | String  | Unique contig identifier                                                                                |
| `Segmented`     | Boolean | Whether the genome is segmented. Only `TRUE` for select isolates                                        |
| `RID`           | String  | RdRP Identifier (if any)                                                                                |
| `Note`          | String  | A verbal description regarding abnormal contigs                                                         |
| `Genetic_Code`  | String  | The contig's [genetic code](https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables#Alternative_codons)  |
| `Type.hit`      | String  | The type CRISPR which matched the contig (**if any**)                                                   |
| `Hit.s.`        | String  | The lineage of the CRISPR matched spacer                                                                |
| `Full_name`     | String  | The original fasta header of a contig, as it was in the original source material                        |
| `RBS`           | String  | The number ORFs preceded by an Shine-Delgarno RBS-like sequence                                         |
| `RvANI90`       | String  | RvANI cluster membership                                                                                |
| `AfLvl`         | String  | The affiliation level of a contig with a given tree leaf (_i.e._ to the value in RCR90)                 |
| `Host_Evidence` | String  | The evidence for the contigs' host assignment                                                           |
| `Host`          | String  | The host for the node                                                                                   |
| `Length`        | Integer | The length of the contig                                                                                |
| `BinID`         | String  | The genome ID for the contig (only relevant for segmented genomes)                                      |
| `Phylum`        | String  | The phylum for the contig                                                                               |
| `Class`         | String  | The class for the contig                                                                                |
| `Order`         | String  | The order for the contig                                                                                |
| `Family`        | String  | The family for the contig                                                                               |
| `Genus`         | String  | The genus for the contig                                                                                |
| `ITS.SP.ID`     | String  | ITS sample ID (the unique sample identifier for a contig source)                                        |
| `Novel`         | Boolean | `FALSE` if the contig is from the "Reference Set". `TRUE` if it's from the IMG metatranscriptomes mined |

#### Example data

```
Source	RCR90	ND	Segmented	RID	Note	Genetic_Code	Type.hit	Hit.s.	Full_name	RBS	ANI90	AfLvl	Host_Evidence	Host	Length	BinID	Phylum	Class	Order	Family	Genus	ITS.SP.ID	Novel
3300003307	Rv4_009481	ND_299653	FALSE	46525	Rv4_009481	RN90.0012994	NC98.140726	NC95_125295	NC90_009681	NC99.262892	NA	Standard	NA	NA	3300003307_Ga0006883J46559_1007723	NA	ANI90_0028208	Lvl 0 - Megatree leaves.	NA	NA	4553	ND_299653	4553	NA	Duplornaviricota	Resentoviricetes	Reovirales	Reoviridae	NA	1031590	TRUE
3300003307	Rv4_009528	ND_299698	FALSE	46526	Rv4_009528	RN90.0013035	NC98.140769	NC95_125331	NC90_009628	NC99.262935	NA	Standard	NA	NA	3300003307_Ga0006883J46559_1029623	NA	ANI90_0028169	Lvl 0 - Megatree leaves.	NA	NA	3651	ND_299698	3651	NA	Duplornaviricota	Resentoviricetes	Reovirales	Reoviridae	NA	1031590	TRUE
3300004477	Rv4_083540	ND_300853	FALSE	46560	Rv4_021302	NA	NC98.146388	NC95_007711	NC90_039020	NC99.279419	NA	Standard	NA	NA	3300004477_Ga0068971_1566391	NA	ANI90_0019756	Lvl 2 - members of single-leaf-level ANI90 cluster	NA	NA	1290	ND_300853	1290	NA	Duplornaviricota	Resentoviricetes	Reovirales	Reoviridae	NA	1031533	TRUE
```

### Annotations

Similarly, annotations generated by XXX are listed in a .tsv file, which contains the following metadata columns:

| Column              | Type   | Description                                                                                                                  |
| :------------------ | :----- | :--------------------------------------------------------------------------------------------------------------------------- |
| `ND`                | String | Contig identifier                                                                                                            |
| `ORFID`             | String | Open reading frame identifier                                                                                                |
| `profile_accession` | String | Identifier of the profile (MSA or HMM) match                                                                                 |
| `p1`                | String | The start coordinate of a match on the profile                                                                               |
| `p2`                | String | The end coordinate of a match on the profile                                                                                 |
| `pL`                | String | The matching profile length (in AA residues)                                                                                 |
| `pCoverage`         | String | The coverage of the matching profile by the alignment                                                                        |
| `score`             | String | The score of the alignment                                                                                                   |
| `evalue`            | String | The [E-value](https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Web&PAGE_TYPE=BlastDocs&DOC_TYPE=FAQ#expect) of the profile match |
| `New_Name`          | String | The contextual predicted function of the domain match                                                                        |
| `Analysis_Type`     | String | The source of the profile match                                                                                              |
| `ali_Qcov_len`      | String | The length of the alignment of the hit to the ORF                                                                            |
| `ClanID`            | String | The profile clan membership                                                                                                  |
| `Comment`           | String | A comment about the profile                                                                                                  |
| `strand`            | String | The strand of the hit                                                                                                        |

#### Example data

```
ND	ORFID	profile_accession	p1	p2	pL	pCoverage	score	evalue	New_Name	Analysis_Type	ali_Qcov_len	ClanID	Comment	Classified	strand
ND_015762	ND_015762__1__1070..1415	NVPC.4921	1	344	345	NA	291.7	1.1e-84	RdRp_bracelet-C	NVPCpl	345	NA	NA	1	+	Duplornaviricota	Resentoviricetes	Reovirales	Reoviridae	Cypovirus_14
ND_015762	ND_015762__61138_1	EF23215.1	1	368	369	0.997289972899729	498	5.1e-148	RdRp	ECOD	368	NA	NA	3	+	Duplornaviricota	Resentoviricetes	Reovirales	Reoviridae	Cypovirus_14
ND_015762	ND_015762__61138_1	EF24979.0	3	274	274	0.992700729927007	374.8	8.6e-111	RdRp_Reo-NTD	ECOD	272	NA	Reo RdRp N-terminal domain (1mukA:2-380): alpha-helical domain involved in the formation of the RNA template entry channel and access to the polymerase active site	1	+	Duplornaviricota	Resentoviricetes	Reovirales	Reoviridae	Cypovirus_14
```

### IMG scaffold cart

This **space-separated** .tsv file is able to be used to generate a IMG Scaffold Cart for the data set.
For information about its format, see the [IMG Scaffold Cart documentation](https://img.jgi.doe.gov/docs/ScafCart.pdf).

#### Example Data

```
Scaffold ID
3300003307 assembled Ga0006883J46559_1007723
3300003307 assembled Ga0006883J46559_1029623
3300004477 assembled Ga0068971_1566391
3300004601 assembled Ga0068934_1277308
3300004609 assembled Ga0068958_1157165
```

### Tree

A tree is generated for each taxon using the R library castor, by prunning the megatree to tips associcated with each taxa. The trees are [Newick formatted](https://en.wikipedia.org/wiki/Newick_format).

### RdRps

For simplicity sake, we have added the RdRp sequences and some of the final cluster alignments directly to our FTPs:

- [https://portal.nersc.gov/dna/microbial/prokpubs/Riboviria/RiboV1.4/Alignments/](https://portal.nersc.gov/dna/microbial/prokpubs/Riboviria/RiboV1.4/Alignments/)
- [https://ftp.ncbi.nih.gov/pub/wolf/misc/JGI-TAU/](https://ftp.ncbi.nih.gov/pub/wolf/misc/JGI-TAU/)

Another variation of the RdRps identified is available in the updated Zenodo deposit.
If you have any questions, don't hesitate to contact us!
  

#### Example data

```
(Rv4_171101:2.865405286,(Rv4_299534:2.622437674,(Rv4_251004:2.449908314,(Rv4_034341:1.317564343,Rv4_049968:1.317564343):1.132343971):0.1725293602):0.2429676112):0.1683922588;
```

## Getting help

If you need help, please contact the RVMT team. You can find a contact form [here](/contact) or reach out directly via email at urineri (at) mail.tau.ac (dot)il. We are happy to help!

## Citing RVMT

The RVMT manuscript was publised in *Cell*. If you use data from the RVMT, please consider citing our work with the following citation:

> Neri U, Wolf YI, Roux S, Camargo AP, Lee B, Kazlauskas D, Chen IM, Ivanova N, Zeigler Allen L, Paez-Espino D, Bryant DA, Bhaya D; RNA Virus Discovery Consortium, Krupovic M, Dolja VV, Kyrpides NC, Koonin EV, Gophna U. Expansion of the global RNA virome reveals diverse clades of bacteriophages. Cell. 2022 Sep 25:S0092-8674(22)01118-7. doi:[10.1016/j.cell.2022.08.023](https://doi.org/10.1016/j.cell.2022.08.023).
