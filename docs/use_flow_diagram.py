"""
Premier League Prediction Tracker - User Flow Diagram

This script generates a flow diagram of the app's user flow using graphviz.
Run this script to produce a PNG diagram (requires graphviz and python-graphviz).
"""
from graphviz import Digraph

diagram = Digraph(comment='Premier League Prediction Tracker Flow')

diagram.attr(rankdir='LR', size='8,5')

diagram.node('A', 'Home Page\n(Premier League Table)')
diagram.node('B', 'Prediction Form\n(Enter Team Order)')
diagram.node('C', 'Score Calculation\n(Compare Predictions)')
diagram.node('D', 'Weekly Update\n(New Scores)')

diagram.edges(['AB', 'BC', 'CD'])

diagram.node('E', 'API Fetch\n(Live Table)', shape='box')
diagram.edge('E', 'A')

diagram.render('docs/use_flow_diagram', format='png', cleanup=True)
print('Flow diagram generated: docs/use_flow_diagram.png')
