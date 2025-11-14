<?php
// backend/fetch_result.php
require_once 'db.php';

$id = $_GET['id'] ?? null;
if (!$id) {
    echo "No result id provided.";
    exit;
}

$stmt = $pdo->prepare("SELECT a.*, u.name, u.email FROM assessments a LEFT JOIN users u ON a.user_id = u.id WHERE a.id = :id LIMIT 1");
$stmt->execute([':id' => $id]);
$row = $stmt->fetch();

if (!$row) {
    echo "Result not found.";
    exit;
}

$suggestions = '';
if (strpos($row['result'], 'Vata') !== false) {
  $suggestions .= "<li>Grounding routines, warm oil massage, warm nourishing foods.</li>";
}
if (strpos($row['result'], 'Pitta') !== false) {
  $suggestions .= "<li>Cooling foods, avoid spicy & acidic diet, practice calming techniques.</li>";
}
if (strpos($row['result'], 'Kapha') !== false) {
  $suggestions .= "<li>Light exercise, warming spices, reduce heavy & oily foods.</li>";
}
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Assessment Result</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
<div class="container py-4">
  <div class="card p-4">
    <h3>Assessment Result</h3>
    <p><strong>Result ID:</strong> <?php echo htmlspecialchars($row['id']); ?></p>
    <?php if ($row['name']): ?>
     
