# Function to shuffle an array
function Shuffle-Array {
    param (
        [array]$Array
    )

    $Array | Get-Random -Count $Array.Count
}

# Function to send a request
function Invoke-SendRequest {
    param (
        [string]$Url
    )

    try {
        $response = Invoke-RestMethod -Uri $Url -Method Get
        Write-Host "Request to $Url succeeded with status: $($response.StatusCode)"
    } catch {
        Write-Host "Request to $Url failed with error: $($_.Exception.Message)"
    }
}

# Define variables
$BaseUrl = "https://kb-app-heroku-80283ca5f138.herokuapp.com"
$StandardRoutes = @("/", "/api/v1/guide", "/api/v1/responses")
$MemoryHogLightRoutes = @("/memory-hog/light", "/memory-hog/moderate")
$MemoryHogModerateRoute = "/memory-hog"
$QueryRoutes = ("/api/v1/test/test-query?id=123&type=example", "/api/v1/test/test-query?id=1234&type=example1", "/api/v1/test/test-query?id=987&type=example3")

$StandardRequestsPerRoute = 150
$MemoryHogLightRequests = 50
$MemoryHogModerateRequests = 30
$QueryRoutesRequests = 100

$StandardInterval = 2
$MemoryHogLightInterval = 4
$MemoryHogModerateInterval = 8
$QueryRoutesInterval = 2

# Start jobs for each function
$job1 = Start-Job -ScriptBlock {
    function Shuffle-Array {
        param ([array]$Array)
        $Array | Get-Random -Count $Array.Count
    }

    function Invoke-SendRequest {
        param ([string]$Url)
        try {
            $response = Invoke-RestMethod -Uri $Url -Method Get
            Write-Host "Request to $Url succeeded with status: $($response.StatusCode)"
        } catch {
            Write-Host "Request to $Url failed with error: $($_.Exception.Message)"
        }
    }

    function Invoke-StandardRequests {
        param (
            [array]$Routes,
            [string]$BaseUrl,
            [int]$RequestsPerRoute,
            [int]$Interval
        )
        for ($i = 1; $i -le $RequestsPerRoute; $i++) {
            $ShuffledRoutes = Shuffle-Array -Array $Routes
            foreach ($route in $ShuffledRoutes) {
                $FullUrl = "$BaseUrl$route"
                Invoke-SendRequest -Url $FullUrl
                Start-Sleep -Seconds $Interval
            }
        }
    }

    Invoke-StandardRequests -Routes $using:StandardRoutes -BaseUrl $using:BaseUrl -RequestsPerRoute $using:StandardRequestsPerRoute -Interval $using:StandardInterval
}

$job2 = Start-Job -ScriptBlock {
    function Shuffle-Array {
        param ([array]$Array)
        $Array | Get-Random -Count $Array.Count
    }

    function Invoke-SendRequest {
        param ([string]$Url)
        try {
            $response = Invoke-RestMethod -Uri $Url -Method Get
            Write-Host "Request to $Url succeeded with status: $($response.StatusCode)"
        } catch {
            Write-Host "Request to $Url failed with error: $($_.Exception.Message)"
        }
    }

    function Invoke-MemoryHogLight {
        param (
            [array]$Routes,
            [string]$BaseUrl,
            [int]$RequestsPerRoute,
            [int]$Interval
        )
        for ($i = 1; $i -le $RequestsPerRoute; $i++) {
            $ShuffledRoutes = Shuffle-Array -Array $Routes
            foreach ($route in $ShuffledRoutes) {
                $FullUrl = "$BaseUrl$route"
                Invoke-SendRequest -Url $FullUrl
                Start-Sleep -Seconds $Interval
            }
        }
    }

    Invoke-MemoryHogLight -Routes $using:MemoryHogLightRoutes -BaseUrl $using:BaseUrl -RequestsPerRoute $using:MemoryHogLightRequests -Interval $using:MemoryHogLightInterval
}

$job3 = Start-Job -ScriptBlock {
    function Invoke-SendRequest {
        param ([string]$Url)
        try {
            $response = Invoke-RestMethod -Uri $Url -Method Get
            Write-Host "Request to $Url succeeded with status: $($response.StatusCode)"
        } catch {
            Write-Host "Request to $Url failed with error: $($_.Exception.Message)"
        }
    }

    function Invoke-MemoryHogModerate {
        param (
            [string]$Route,
            [string]$BaseUrl,
            [int]$Requests,
            [int]$Interval
        )
        for ($i = 1; $i -le $Requests; $i++) {
            $FullUrl = "$BaseUrl$Route"
            Invoke-SendRequest -Url $FullUrl
            Start-Sleep -Seconds $Interval
        }
    }

    Invoke-MemoryHogModerate -Route $using:MemoryHogModerateRoute -BaseUrl $using:BaseUrl -Requests $using:MemoryHogModerateRequests -Interval $using:MemoryHogModerateInterval
}

$job4 = Start-Job -ScriptBlock {
    function Shuffle-Array {
        param ([array]$Array)
        $Array | Get-Random -Count $Array.Count
    }

    function Invoke-SendRequest {
        param ([string]$Url)
        try {
            $response = Invoke-RestMethod -Uri $Url -Method Get
            Write-Host "Request to $Url succeeded with status: $($response.StatusCode)"
        } catch {
            Write-Host "Request to $Url failed with error: $($_.Exception.Message)"
        }
    }

    function Invoke-QueryRequests {
        param(
            [array]$Routes,
            [string]$BaseUrl,
            [int]$RequestsPerRoute,
            [int]$Interval
        )
        for ($i = 1; $i -le $RequestsPerRoute; $i++) {
            $ShuffledRoutes = Shuffle-Array -Array $Routes
            foreach ($route in $ShuffledRoutes) {
                $FullUrl = "$BaseUrl$route"
                Invoke-SendRequest -Url $FullUrl
                Start-Sleep -Seconds $Interval
            }
        }
    }
    Invoke-QueryRequests -Routes $using:QueryRoutes -BaseUrl $using:BaseUrl -RequestsPerRoute $using:QueryRoutesRequests -Interval $using:QueryRoutesInterval
}

# Wait for all jobs to complete
Write-Host "Waiting for all tasks to complete..."
Wait-Job -Job $job1, $job2, $job3, $job4

# Retrieve job results
Write-Host "All tasks completed. Retrieving results..."
Receive-Job -Job $job1
Receive-Job -Job $job2
Receive-Job -Job $job3
Receive-Job -Job $job4

# Clean up jobs
Remove-Job -Job $job1, $job2, $job3, $job4
