<?php
session_start();
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../assessment.html');
    exit;
}

$user_id = $_SESSION['user_id'] ?? null;

$vata = $pitta = $kapha = 0;
for ($i = 1; $i <= 12; $i++) {
    $val = $_POST['q'.$i] ?? '';
    if ($val === 'vata') $vata++;
    elseif ($val === 'pitta') $pitta++;
    elseif ($val === 'kapha') $kapha++;
}

if ($vata > $pitta && $vata > $kapha) $result = 'Vata';
elseif ($pitta > $vata && $pitta > $kapha) $result = 'Pitta';
elseif ($kapha > $vata && $kapha > $pitta) $result = 'Kapha';
else {
    $max = max($vata, $pitta, $kapha);
    $arr = [];
    if ($vata === $max) $arr[] = 'Vata';
    if ($pitta === $max) $arr[] = 'Pitta';
    if ($kapha === $max) $arr[] = 'Kapha';
    $result = implode('-', $arr);
}

$stmt = $pdo->prepare("INSERT INTO assessments (user_id, vata_score, pitta_score, kapha_score, result) VALUES (:uid, :v, :p, :k, :res)");
$stmt->execute([':uid'=>$user_id, ':v'=>$vata, ':p'=>$pitta, ':k'=>$kapha, ':res'=>$result]);
$lastId = $pdo->lastInsertId();
header("Location: fetch_result.php?id=".$lastId);
