# ELT2 // ESSID Research 
## Experimentation with Graph Visualisation and Centrality Metrics


<p align="center">
  <img style="width:250px" src="https://d33wubrfki0l68.cloudfront.net/cf9fc07728f1a59f546d83172784701e3b4a659d/40c12/static/eltwallet.c6dbb42e.png" alt="ELTCOIN logo">
</p>

This repository contains code and data for experimenting with various graph Visualisation techniques and centrality metrics. It includes a number of scripts for generating synthetic data sets, functions for calculating centrality metrics, and examples of rendering the resulting graphs using the D3.js library.

The ELT2 project represents a significant advancement in the realm of web of trust systems. By leveraging Evidence Based Subjective Logic (EBSL) and centrality metrics, we are able to create a network that is both secure and resistant to sybil attacks, as well as being accessible and user-friendly for those who may not possess advanced technical skills. These measures are essential for maintaining the reliability and trustworthiness of the network, and the Visualisations we create will help to make these complex concepts more understandable and approachable for all users. It is worth noting that the EBSL algorithm calculates trust values based on objective evidence, rather than subjective opinions. This objective approach is critical for preserving the integrity of the network and safeguarding against malicious actors. By carefully considering the various ways in which these measures can be applied, we can achieve a web of trust system that is unparalleled in terms of decentralisation and self-sovereignty.

---

Sybil detection is a critical component of any web of trust project because it helps to maintain the integrity and reliability of the network. In a web of trust, users rely on the opinions and recommendations of other trusted individuals to make decisions. If the network is compromised by malicious actors creating multiple "sybil" identities, it can significantly undermine the trustworthiness of the entire system. By detecting and addressing these sybil nodes, we can ensure the reliability of the trust network.

The Evidence Based Subjective Logic (EBSL) algorithm is a key tool in our simulation for accurately calculating and maintaining trust values within the trust network. EBSL takes into account multiple sources of evidence and subjective probabilities in order to calculate trust values that are both objective and subjective. This helps to provide a more accurate representation of trust within the network and allows us to more effectively identify and address sybil nodes.

In order to effectively use measures such as Evidence Based Subjective Logic (EBSL) and centrality metrics in the ELT2 project, it is important to have a thorough understanding of how these measures work and how they can be applied in a real-world setting. By carefully configuring the ELT2 airdrop to utilise these algorithmic measures, we can create a more secure and reliable network that is resistant to sybil attacks. This is particularly important in the early phase of the airdrop, when the network is still forming and the consequences of a successful sybil attack could be significant. By investing the time and resources necessary to understand and utilise these measures effectively, we can ensure the long-term success and reliability of the ELT2 airdrop.

### Some Possible Learning Objectives:

    - To understand the role of sybil detection and centrality metrics in maintaining the reliability and trustworthiness of a web of trust system
    - To evaluate the effectiveness of different algorithms and techniques for detecting and mitigating sybil attacks
    - To explore the various ways in which centrality metrics can be visualized and used to understand the structure and behavior of the network
    - To develop and implement strategies for utilizing centrality metrics and EBSL to optimize the distribution of resources within the network
    - To assess the impact of different network configurations on the security and performance of the system
    - To identify and address any challenges or limitations encountered during the research process, and to develop potential solutions or approaches to mitigate these issues

---

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository.
2. Install dependencies by running `npm i`.

### Usage

1. To generate a synthetic data set, then compute and save certain centrality metrics using the random source data:

    - node Airsim.js <number of nodes> <number of sybil nodes> <number of linking nodes>


    2. To render a force graph of the data set:

        1. Open `index.html` in a web browser.
        2. Enter the data set in JSON format into the input box.
        3. Click the "Render Graph" button.

To render a different type of graph representing addresses on tomo testnet, see the various largely unfinished and messy scripts and functions in the `code` directory.

### License

This project is licensed under the MIT License. 
