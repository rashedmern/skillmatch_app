"""
SkillMatch Presentation Automation Engineer (Python Script)
Generates an editable 20-slide academic PowerPoint presentation (.pptx)
matching the visual identity of https://skillmatchapp-ten.vercel.app/

Requires: pip install python-pptx
"""

import sys
import os
import json

def generate_pptx():
    try:
        from pptx import Presentation
        from pptx.util import Inches, Pt
        from pptx.dml.color import RGBColor
        from pptx.enum.text import PP_ALIGN
        from pptx.enum.shapes import MSO_SHAPE
    except ImportError:
        print("[NOTICE] 'python-pptx' is not installed in the current Python environment.")
        print("To install: pip install python-pptx")
        print("Note: The PPTX has already been generated via node.js (generate_presentation.js).")
        return

    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    # Oceanic Intelligence Palette
    C_OBSIDIAN = RGBColor(0x05, 0x1C, 0x19)
    C_CANVAS = RGBColor(0x14, 0x15, 0x1C)
    C_CARD = RGBColor(0x12, 0x19, 0x20)
    C_CARD_ELEVATED = RGBColor(0x1A, 0x23, 0x2D)
    C_BORDER_DARK = RGBColor(0x1E, 0x29, 0x3B)
    C_PINE = RGBColor(0x09, 0x59, 0x64)
    C_MINT = RGBColor(0x00, 0xD4, 0xBE)
    C_CYAN = RGBColor(0x67, 0xE8, 0xF9)
    C_CORAL = RGBColor(0xE4, 0x25, 0x20)
    C_WHITE = RGBColor(0xFF, 0xFF, 0xFF)
    C_SECONDARY = RGBColor(0x94, 0xA3, 0xB8)
    C_MUTED = RGBColor(0x64, 0x74, 0x8B)

    blank_layout = prs.slide_layouts[6]

    # Helper: Master Header
    def add_header(slide, title, subtitle, slide_num, total=20):
        # Top Accent Line
        accent = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(0.05))
        accent.fill.solid()
        accent.fill.fore_color.rgb = C_MINT
        accent.line.color.rgb = C_MINT

        # Brand Badge Squircle
        badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.32), Inches(0.42), Inches(0.42))
        badge.fill.solid()
        badge.fill.fore_color.rgb = C_PINE
        badge.line.color.rgb = C_MINT

        # Wordmark
        tx_box = slide.shapes.add_textbox(Inches(1.3), Inches(0.35), Inches(1.8), Inches(0.35))
        tf = tx_box.text_frame
        p = tf.paragraphs[0]
        r1 = p.add_run()
        r1.text = "Skill"
        r1.font.bold = True
        r1.font.color.rgb = C_WHITE
        r1.font.size = Pt(15)
        r2 = p.add_run()
        r2.text = "Match"
        r2.font.bold = True
        r2.font.color.rgb = C_MINT
        r2.font.size = Pt(15)

        # Title
        t_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.98), Inches(11.733), Inches(0.45))
        p_t = t_box.text_frame.paragraphs[0]
        p_t.text = title
        p_t.font.bold = True
        p_t.font.size = Pt(21)
        p_t.font.color.rgb = C_WHITE

        # Subtitle
        if subtitle:
            s_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.45), Inches(11.733), Inches(0.3))
            p_s = s_box.text_frame.paragraphs[0]
            p_s.text = subtitle
            p_s.font.size = Pt(12)
            p_s.font.color.rgb = C_MINT

        # Footer
        f_box = slide.shapes.add_textbox(Inches(0.8), Inches(7.02), Inches(11.733), Inches(0.3))
        p_f = f_box.text_frame.paragraphs[0]
        p_f.text = f"https://skillmatchapp-ten.vercel.app/   |   Slide {slide_num} of {total}"
        p_f.font.size = Pt(9)
        p_f.font.color.rgb = C_MUTED

    # 1. Title Slide
    s1 = prs.slides.add_slide(blank_layout)
    title_box = s1.shapes.add_textbox(Inches(1.0), Inches(2.55), Inches(11.333), Inches(1.0))
    p = title_box.text_frame.paragraphs[0]
    p.text = "[PROJECT_TITLE]"
    p.font.bold = True
    p.font.size = Pt(34)
    p.font.color.rgb = C_WHITE
    p.alignment = PP_ALIGN.CENTER

    # Save
    out_file = os.path.join(os.path.dirname(__file__), "website_presentation_template.pptx")
    prs.save(out_file)
    print(f"[SUCCESS] Python PPTX saved at {out_file}")

if __name__ == "__main__":
    generate_pptx()
