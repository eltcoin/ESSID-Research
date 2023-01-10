import igraph

def generate_airdrop_data(model, node_count, edge_probability):
    # Generate the node graph data using the generate_data function
    g = generate_data(model, node_count, edge_probability)

    # Code to perform the airdrop simulation goes here

    return g


def generate_data(model, *args, **kwargs):
  # print(dir(igraph.Graph))
  if model == 'erdos_renyi':
    # Generate data using the Erdos-Renyi model
    g = igraph.Graph.Erdos_Renyi(*args, **kwargs)
  elif model == 'barabasi':
    # Generate data using the Barabasi model
    g = igraph.Graph.Barabasi(*args, **kwargs)
  elif model == 'watts_strogatz':
    # Generate data using the Watts-Strogatz model
    g = igraph.Graph.Watts_Strogatz(*args, **kwargs, )
  elif model == 'newman_watts_strogatz':
    # Generate data using the Newman-Watts-Strogatz model
    g = igraph.Graph.Newman_Watts_Strogatz(*args, **kwargs)
  elif model == 'holme_kim':
    # Generate data using the Holme-Kim model
    g = igraph.Graph.Holme_Kim(*args, **kwargs)
  elif model == 'citation':
    # Generate data using the Citation graph model
    g = igraph.Graph.Citation(*args, **kwargs)
  elif model == 'ssymmetric_preference':
    # Generate data using the Preferential Attachment model
    g = igraph.Graph.Asymmetric_Preference(*args, **kwargs)
  elif model == 'growing_random':
    # Generate data using the Growing Random model
    g = igraph.Graph.Growing_Random(*args, **kwargs)
  elif model == 'establishment':
    # Generate data using the Establishment model
    g = igraph.Graph.Establishment(*args, **kwargs)
  elif model == 'forest_fire':
    # Generate data using the Forest Fire model
    g = igraph.Graph.Forest_Fire(*args, **kwargs)
  elif model == 'barabasi_game':
    # Generate data using the Barabasi Game model
    g = igraph.Graph.Barabasi_Game(*args, **kwargs)
  else:
    raise ValueError('Invalid model specified')
  return g
  

# # Generate synthetic data using the Erdos-Renyi model
# g = generate_airdrop_data('erdos_renyi', 100, 0.1)
# print(g);
# # Generate synthetic data using the Barabasi model
# g = generate_airdrop_data('barabasi', 100, 1)
# print(g);
# # Generate synthetic data using the Watts-Strogatz model
# # g = generate_airdrop_data('watts_strogatz', 100, 0.1)

# # Visualize the airdrop data
# igraph.plot(g)

# igraph.write(g, 'airdrop.json');

# print(g);
