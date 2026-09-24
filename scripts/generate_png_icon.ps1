Add-Type -AssemblyName System.Drawing

$bmp = New-Object System.Drawing.Bitmap 512, 512
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# Clear with transparent
$g.Clear([System.Drawing.Color]::Transparent)

# Rounded squircle path
$rect = New-Object System.Drawing.Rectangle 16, 16, 480, 480
$radius = 120
$diameter = $radius * 2
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddArc($rect.X, $rect.Y, $diameter, $diameter, 180, 90)
$path.AddArc($rect.Right - $diameter, $rect.Y, $diameter, $diameter, 270, 90)
$path.AddArc($rect.Right - $diameter, $rect.Bottom - $diameter, $diameter, $diameter, 0, 90)
$path.AddArc($rect.X, $rect.Bottom - $diameter, $diameter, $diameter, 90, 90)
$path.CloseFigure()

# Fill Gradient #004049 to #095964
$p1 = New-Object System.Drawing.Point 16, 16
$p2 = New-Object System.Drawing.Point 496, 496
$cGradStart = [System.Drawing.Color]::FromArgb(255, 0, 64, 73)
$cGradEnd = [System.Drawing.Color]::FromArgb(255, 9, 89, 100)
$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $p1, $p2, $cGradStart, $cGradEnd
$g.FillPath($brush, $path)

# Stroke
$cBorder = [System.Drawing.Color]::FromArgb(50, 255, 255, 255)
$penBorder = New-Object System.Drawing.Pen $cBorder, 10
$g.DrawPath($penBorder, $path)

# Graph transform
$g.TranslateTransform(137.0, 137.0)
$g.ScaleTransform(8.5, 8.5)

# Colors
$cMint = [System.Drawing.Color]::FromArgb(255, 0, 212, 190)
$cCyan = [System.Drawing.Color]::FromArgb(255, 103, 232, 249)
$cLightCyan = [System.Drawing.Color]::FromArgb(255, 165, 243, 252)
$cWhite = [System.Drawing.Color]::White
$cTeal = [System.Drawing.Color]::FromArgb(255, 9, 89, 100)

# Lines
$penMint = New-Object System.Drawing.Pen $cMint, 2.5
$penMint.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$penMint.EndCap = [System.Drawing.Drawing2D.LineCap]::Round

$penCyan = New-Object System.Drawing.Pen $cCyan, 2.5
$penCyan.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$penCyan.EndCap = [System.Drawing.Drawing2D.LineCap]::Round

$penLightCyan = New-Object System.Drawing.Pen $cLightCyan, 2.5
$penLightCyan.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$penLightCyan.EndCap = [System.Drawing.Drawing2D.LineCap]::Round

$g.DrawLine($penMint, 14.0, 14.0, 14.0, 4.0)
$g.DrawLine($penCyan, 14.0, 14.0, 23.5, 10.0)
$g.DrawLine($penLightCyan, 14.0, 14.0, 20.0, 23.0)
$g.DrawLine($penLightCyan, 14.0, 14.0, 8.0, 23.0)
$g.DrawLine($penCyan, 14.0, 14.0, 4.5, 10.0)

# Leaf Circles helper
function DrawNode([float]$cx, [float]$cy, [float]$r, [System.Drawing.Color]$color) {
    $b = New-Object System.Drawing.SolidBrush $color
    $g.FillEllipse($b, ($cx - $r), ($cy - $r), ($r * 2), ($r * 2))
    $b.Dispose()
}

DrawNode 14.0 4.0 3.2 $cWhite
DrawNode 23.5 10.0 3.2 $cMint
DrawNode 20.0 23.0 3.2 $cCyan
DrawNode 8.0 23.0 3.2 $cCyan
DrawNode 4.5 10.0 3.2 $cMint

# Center hub node
$bWhite = New-Object System.Drawing.SolidBrush $cWhite
$g.FillEllipse($bWhite, [float](14.0 - 5.0), [float](14.0 - 5.0), 10.0, 10.0)
$penHub = New-Object System.Drawing.Pen $cTeal, 1.5
$g.DrawEllipse($penHub, [float](14.0 - 5.0), [float](14.0 - 5.0), 10.0, 10.0)

$bTeal = New-Object System.Drawing.SolidBrush $cTeal
$g.FillEllipse($bTeal, [float](14.0 - 2.2), [float](14.0 - 2.2), 4.4, 4.4)

# Save
$outPath = Resolve-Path "public\images\skillmatch-oauth-logo.png" -ErrorAction SilentlyContinue
if (-not $outPath) {
    $outPath = Join-Path (Get-Location) "public\images\skillmatch-oauth-logo.png"
}
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
Write-Host "SUCCESS: Generated PNG at $outPath"
