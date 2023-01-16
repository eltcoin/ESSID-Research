Feature: Airdrop Simulation
  As a user, I want to be able to simulate airdrops on a trust network
  So that I can evaluate the effectiveness of different airdrop strategies
  
  Scenario: Initialize AirdropSimulation
    Given I have a trust network represented by a directed graph
    When I initialize the AirdropSimulation class
    Then the class should be properly initialized with the trust network
    
  Scenario: Run Airdrop with default parameters
    Given I have initialized the AirdropSimulation class
    When I run the airdrop with default parameters
    Then the airdrop should be run successfully on the trust network
    And the number of distributor nodes should be within expected range
    And the trust values of nodes should be updated accordingly
    
  Scenario: Run Airdrop with custom parameters
    Given I have initialized the AirdropSimulation class
    When I run the airdrop with custom parameters
    Then the airdrop should be run successfully on the trust network
    And the number of distributor nodes should be within expected range
    And the trust values of nodes should be updated accordingly
    
  Scenario: Compare Airdrop strategies
    Given I have initialized the AirdropSimulation class
    When I run multiple airdrop strategies
    Then the airdrop should be run successfully on the trust network
    And the number of distributor nodes should be within expected range
    And the trust values of nodes should be updated accordingly
    And the results of different airdrop strategies should be compared and evaluated.