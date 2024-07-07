// global game options
let gameOptions = {
 
    // platform speed range, in pixels per second
    // 平台速度范围，以像素每秒为单位
    platformSpeedRange: [300, 300],
    平台速度范围: [300, 300],
 
    // mountain speed, in pixels per second
    // 山地速度，以每秒像素为单位
    mountainSpeed: 80,
 
    // spawn range, how far should be the rightmost platform from the right edge
    // 生成范围，最右边的平台距离右边缘应该有多远
    // before next platform spawns, in pixels
    // 在下一个平台生成之前，以像素为单位
    spawnRange: [80, 300],
 
    // platform width range, in pixels
    // 平台宽度范围，以像素为单位
    platformSizeRange: [90, 300],
 
    // a height range between rightmost platform and next platform to be spawned
    // 最右边平台和下一个要生成的平台之间的高度范围
    platformHeightRange: [-5, 5],
 
    // a scale to be multiplied by platformHeightRange
    // 比例尺乘以 platformHeightRange
    platformHeighScale: 20,
 
    // platform max and min height, as screen height ratio
    // 平台最大和最小高度，作为屏幕高度比
    platformVerticalLimit: [0.4, 0.8],
    // 平台垂直限制：[0.4，0.8]
 
    // player gravity
    playerGravity: 900,
 
    // player jump force
    jumpForce: 400,
 
    // player starting X position
    playerStartPosition: 200,
 
    // consecutive jumps allowed
    jumps: 2,
 
    // % of probability a coin appears on the platform
    // 硬币出现在平台上的概率%
    coinPercent: 25,
 
    // % of probability a fire appears on the platform
    // 平台上发生火灾的概率%
    firePercent: 25
}