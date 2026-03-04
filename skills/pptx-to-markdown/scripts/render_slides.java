import org.apache.poi.xslf.usermodel.XMLSlideShow;
import org.apache.poi.xslf.usermodel.XSLFSlide;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.util.List;

/**
 * RenderSlides — Apache POI 5.3.0 utility
 * Renders each slide of a .pptx file to a PNG image.
 *
 * Usage: java -cp "<poi_jars>:." RenderSlides <input.pptx> <output_dir> <total_slides>
 *
 * Output files: slide_001.png, slide_002.png, ...
 * Resolution: 2× the native slide dimensions (default ~1920×1080 for 16:9)
 * Exit code: 0 on full success, 1 if any slide failed to render
 */
public class RenderSlides {

    private static final int SCALE = 2;

    public static void main(String[] args) {
        if (args.length < 2) {
            System.err.println("Usage: java RenderSlides <input.pptx> <output_dir> [total_slides_hint]");
            System.exit(1);
        }

        String inputPath  = args[0];
        String outputDir  = args[1];
        int    totalHint  = args.length >= 3 ? safeParseInt(args[2]) : 0;

        File outDir = new File(outputDir);
        outDir.mkdirs();

        int failed = 0;

        try (XMLSlideShow pptx = new XMLSlideShow(new FileInputStream(inputPath))) {

            Dimension pgSize = pptx.getPageSize();
            int width  = pgSize.width  * SCALE;
            int height = pgSize.height * SCALE;

            List<XSLFSlide> slides = pptx.getSlides();
            int total = slides.size();

            // Inform Python orchestrator of actual slide count
            System.out.println("TOTAL:" + total);

            for (int i = 0; i < total; i++) {
                int slideNum = i + 1;
                printGauge(slideNum, total);

                try {
                    XSLFSlide slide = slides.get(i);

                    BufferedImage img = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
                    Graphics2D g = img.createGraphics();

                    // Rendering quality hints
                    g.setRenderingHint(RenderingHints.KEY_ANTIALIASING,     RenderingHints.VALUE_ANTIALIAS_ON);
                    g.setRenderingHint(RenderingHints.KEY_RENDERING,         RenderingHints.VALUE_RENDER_QUALITY);
                    g.setRenderingHint(RenderingHints.KEY_INTERPOLATION,     RenderingHints.VALUE_INTERPOLATION_BICUBIC);
                    g.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);

                    // White background
                    g.setColor(Color.WHITE);
                    g.fillRect(0, 0, width, height);

                    // Scale to 2×
                    g.scale(SCALE, SCALE);

                    try {
                        slide.draw(g);
                    } catch (Exception drawEx) {
                        // Partial render — log warning but keep the image
                        System.err.println("WARN:SLIDE:" + slideNum + ":" + drawEx.getMessage());
                    }

                    g.dispose();

                    String filename = String.format("%s/slide_%03d.png", outputDir, slideNum);
                    ImageIO.write(img, "PNG", new File(filename));
                    System.out.println("SLIDE:OK:" + slideNum + ":" + filename);

                } catch (Exception e) {
                    System.err.println("ERROR:SLIDE:" + slideNum + ":" + e.getMessage());
                    failed++;
                }
            }

            // Final newline after inline gauge
            System.out.println();
            System.out.println("DONE:" + (total - failed) + "/" + total);

        } catch (Exception e) {
            System.err.println("FATAL: " + e.getMessage());
            e.printStackTrace(System.err);
            System.exit(1);
        }

        System.exit(failed > 0 ? 2 : 0);
    }

    /**
     * Print an in-place slide gauge to stdout.
     * Uses \r to overwrite the current line.
     */
    private static void printGauge(int current, int total) {
        int pct    = (int) Math.round((double) current / total * 100);
        int filled = (int) Math.round((double) current / total * 15);
        int empty  = 15 - filled;

        String bar = "█".repeat(filled) + "░".repeat(empty);
        String line = String.format("\r  slide %02d/%02d  [%s] %3d%%  Renderizando...", current, total, bar, pct);

        System.out.print(line);
        System.out.flush();
    }

    private static int safeParseInt(String s) {
        try { return Integer.parseInt(s); } catch (NumberFormatException e) { return 0; }
    }
}
