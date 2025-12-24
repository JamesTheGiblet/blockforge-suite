/**
 * BlockForge Core - Forge Theory Engine
 * 
 * Universal mathematical framework for converting digital content to LEGO bricks
 * Based on exponential decay mathematics validated across domains
 * 
 * Created by James (ModularDev-Tools / Giblets Creations)
 */

class ForgeTheory {
    constructor() {
        this.decayConstants = {
            image: 0.15,      // Color/detail decay rate for images
            text: 0.10,       // Readability decay for text
            model3d: 0.20,    // Geometric complexity decay for 3D
            pattern: 0.12,    // Pattern fidelity decay
            architecture: 0.18, // Structural detail decay
            audio: 0.25,      // Frequency resolution decay
            data: 0.14        // Information clarity decay
        };
    }

    /**
     * Calculate information retention at a given quantization level
     * I(t) = I₀ · e^(-λt)
     * 
     * @param {number} initialInfo - Initial information content (0-1)
     * @param {number} quantizationSteps - Number of quantization steps applied
     * @param {string} contentType - Type of content (image, text, model3d, etc.)
     * @returns {number} Retained information (0-1)
     */
    calculateRetention(initialInfo, quantizationSteps, contentType) {
        const lambda = this.decayConstants[contentType] || 0.15;
        return initialInfo * Math.exp(-lambda * quantizationSteps);
    }

    /**
     * Find optimal quantization level that preserves target retention
     * Inverse: t = -ln(I(t)/I₀) / λ
     * 
     * @param {number} targetRetention - Desired information retention (0-1)
     * @param {string} contentType - Type of content
     * @returns {number} Optimal quantization steps
     */
    calculateOptimalQuantization(targetRetention, contentType) {
        const lambda = this.decayConstants[contentType] || 0.15;
        return -Math.log(targetRetention) / lambda;
    }

    /**
     * Calculate decay curve data points for visualization
     * 
     * @param {string} contentType - Type of content
     * @param {number} maxSteps - Maximum quantization steps to plot
     * @returns {Array} Array of {step, retention} objects
     */
    generateDecayCurve(contentType, maxSteps = 20) {
        const lambda = this.decayConstants[contentType] || 0.15;
        const curve = [];
        
        for (let t = 0; t <= maxSteps; t++) {
            const retention = Math.exp(-lambda * t);
            curve.push({
                step: t,
                retention: retention,
                retentionPercent: (retention * 100).toFixed(1)
            });
        }
        
        return curve;
    }

    /**
     * Optimize brick count vs quality trade-off
     * Returns recommended settings for a given quality target
     * 
     * @param {string} contentType - Type of content
     * @param {string} quality - 'high', 'medium', or 'low'
     * @returns {Object} Optimization parameters
     */
    optimizeForQuality(contentType, quality = 'medium') {
        const qualityTargets = {
            high: 0.90,    // 90% information retention
            medium: 0.75,  // 75% information retention
            low: 0.60      // 60% information retention
        };
        
        const target = qualityTargets[quality] || 0.75;
        const steps = this.calculateOptimalQuantization(target, contentType);
        
        return {
            quantizationSteps: Math.round(steps),
            expectedRetention: target,
            decayConstant: this.decayConstants[contentType],
            quality: quality
        };
    }

    /**
     * Calculate perceptual quality score (0-100)
     * Accounts for human perception non-linearities
     * 
     * @param {number} retention - Information retention (0-1)
     * @returns {number} Perceptual quality score (0-100)
     */
    calculatePerceptualQuality(retention) {
        // Human perception is logarithmic, not linear
        // Apply perceptual curve adjustment
        const perceptual = Math.pow(retention, 0.7); // Flattens curve slightly
        return Math.round(perceptual * 100);
    }

    /**
     * Estimate brick count for given dimensions and resolution
     * 
     * @param {number} width - Width in studs
     * @param {number} height - Height in studs
     * @param {number} depth - Depth in layers (default 1 for mosaics)
     * @returns {Object} Brick count estimates
     */
    estimateBrickCount(width, height, depth = 1) {
        const totalStuds = width * height * depth;
        
        // Efficiency factors (not all studs need individual bricks)
        const mosaicEfficiency = 0.95;  // Mosaics use most studs
        const sculptureEfficiency = 0.70; // 3D models more efficient
        
        const efficiency = depth === 1 ? mosaicEfficiency : sculptureEfficiency;
        
        return {
            totalStuds: totalStuds,
            estimatedBricks: Math.round(totalStuds * efficiency),
            width: width,
            height: height,
            depth: depth,
            type: depth === 1 ? 'mosaic' : 'sculpture'
        };
    }

    /**
     * Generate complete optimization report
     * 
     * @param {Object} params - Input parameters
     * @returns {Object} Complete optimization analysis
     */
    generateOptimizationReport(params) {
        const {
            contentType,
            quality,
            width,
            height,
            depth = 1
        } = params;

        const optimization = this.optimizeForQuality(contentType, quality);
        const retention = this.calculateRetention(1.0, optimization.quantizationSteps, contentType);
        const perceptualQuality = this.calculatePerceptualQuality(retention);
        const brickEstimate = this.estimateBrickCount(width, height, depth);
        const decayCurve = this.generateDecayCurve(contentType);

        return {
            optimization: optimization,
            retention: {
                mathematical: retention,
                perceptual: perceptualQuality,
                percentage: (retention * 100).toFixed(1)
            },
            bricks: brickEstimate,
            decayCurve: decayCurve,
            contentType: contentType,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Validate if optimization meets minimum quality standards
     * 
     * @param {number} retention - Information retention (0-1)
     * @param {string} contentType - Type of content
     * @returns {Object} Validation result
     */
    validateQuality(retention, contentType) {
        const minimumRetention = 0.50; // 50% minimum
        const recommendedRetention = 0.70; // 70% recommended
        
        const passes = retention >= minimumRetention;
        const recommended = retention >= recommendedRetention;
        
        let message = '';
        if (!passes) {
            message = 'Quality too low - increase resolution or reduce complexity';
        } else if (!recommended) {
            message = 'Quality acceptable but below recommended threshold';
        } else {
            message = 'Quality meets recommended standards';
        }
        
        return {
            passes: passes,
            recommended: recommended,
            retention: retention,
            message: message
        };
    }
}

// Export for use in studios
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ForgeTheory;
}