<?php
require '../../vendor/autoload.php'; // PhpSpreadsheet instalado con composer

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Fill;

// Conexión BD
$pdo = new PDO("mysql:host=localhost;dbname=tu_base", "usuario", "clave");

// Obtener filtros
$cliente = $_GET['cliente'] ?? '';
$fechaInicio = $_GET['fechaInicio'] ?? '';
$fechaFin = $_GET['fechaFin'] ?? '';

// Armar query dinámico
$query = "SELECT id, nroRemito, fecha, cliente, ejecutante, equipo, litrosGasoil 
          FROM remito 
          WHERE 1=1";

$params = [];

if ($cliente !== '') {
    $query .= " AND cliente LIKE :cliente";
    $params[':cliente'] = "%$cliente%";
}
if ($fechaInicio !== '') {
    $query .= " AND fecha >= :fechaInicio";
    $params[':fechaInicio'] = $fechaInicio;
}
if ($fechaFin !== '') {
    $query .= " AND fecha <= :fechaFin";
    $params[':fechaFin'] = $fechaFin;
}

$stmt = $pdo->prepare($query);
$stmt->execute($params);
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Crear Excel
$spreadsheet = new Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();
$sheet->setTitle("Reporte Remitos");

// Encabezados bonitos
$headers = ["ID", "Nro Remito", "Fecha", "Cliente", "Ejecutante", "Equipo", "Litros Gasoil"];
$col = "A";
foreach ($headers as $h) {
    $sheet->setCellValue($col."1", $h);
    $sheet->getStyle($col."1")->getFont()->setBold(true)->setSize(12);
    $sheet->getStyle($col."1")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
    $sheet->getStyle($col."1")->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setARGB('FF1E293B'); // fondo slate
    $sheet->getStyle($col."1")->getFont()->getColor()->setARGB('FFFFFFFF'); // blanco
    $col++;
}

// Insertar filas
$rowNum = 2;
foreach ($rows as $r) {
    $sheet->setCellValue("A".$rowNum, $r['id']);
    $sheet->setCellValue("B".$rowNum, $r['nroRemito']);
    $sheet->setCellValue("C".$rowNum, $r['fecha']);
    $sheet->setCellValue("D".$rowNum, $r['cliente']);
    $sheet->setCellValue("E".$rowNum, $r['ejecutante']);
    $sheet->setCellValue("F".$rowNum, $r['equipo']);
    $sheet->setCellValue("G".$rowNum, $r['litrosGasoil']);
    $rowNum++;
}

// Autoajustar columnas
foreach (range('A','G') as $col) {
    $sheet->getColumnDimension($col)->setAutoSize(true);
}

// Descargar Excel
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="reporte_remitos.xlsx"');
header('Cache-Control: max-age=0');

$writer = new Xlsx($spreadsheet);
$writer->save('php://output');
exit;
