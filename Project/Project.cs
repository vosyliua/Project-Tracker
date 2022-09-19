﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Project
{
    public class Project
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Date { get; set; } = ""; // auto to keep track where to put this project
        public string Title { get; set; } = "";
        public string Owner { get; set; } = "";
        public string DueBy { get; set; } = "";
        public string BriefStatus { get; set; } = "";
        public string ResearchStatus { get; set; } = "";
        public string ConceptStatus { get; set; } = "";
        public string DesignStatus { get; set; } = "";
        public string MockupStatus { get; set; } = "";
        public string Progress { get; set; } = "";
        public string Priority { get; set; } = "";

    }
}
