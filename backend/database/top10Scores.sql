SELECT s.id_player, p.nickname_player,SUM(s.score) as "acumulated_score"
FROM stats s
JOIN player p ON p.id_player = s.id_player 
GROUP BY id_player 
ORDER BY SUM(score) DESC
LIMIT 10