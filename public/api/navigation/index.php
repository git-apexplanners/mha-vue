<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Define the path to the navigation data file
$navigationFile = __DIR__ . '/navigation.json';

// Handle GET request - Return the navigation data
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($navigationFile)) {
        echo file_get_contents($navigationFile);
    } else {
        // Return empty array if file doesn't exist yet
        echo '[]';
    }
    exit();
}

// Handle POST request - Save the navigation data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Get the raw POST data
        $jsonData = file_get_contents('php://input');
        
        // Validate JSON
        $data = json_decode($jsonData);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Invalid JSON data');
        }
        
        // Save the data to the file
        if (file_put_contents($navigationFile, $jsonData) === false) {
            throw new Exception('Failed to write navigation data to file');
        }
        
        // Return success response
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Navigation saved successfully']);
    } catch (Exception $e) {
        // Return error response
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit();
}

// If we get here, it's an unsupported method
http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed']);
